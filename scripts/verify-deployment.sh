#!/bin/bash

# Deployment Verification Script
# This script helps verify your Next.js + Nginx setup on Ubuntu

set -euo pipefail

echo "🔍 Starting Deployment Verification..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_service() {
    local service=$1
    if systemctl is-active --quiet $service; then
        echo -e "${GREEN}✓${NC} $service is running"
        return 0
    else
        echo -e "${RED}✗${NC} $service is NOT running"
        return 1
    fi
}

check_port() {
    local port=$1
    if ss -tlnp | grep -q ":$port "; then
        echo -e "${GREEN}✓${NC} Port $port is listening"
        return 0
    else
        echo -e "${RED}✗${NC} Port $port is NOT listening"
        return 1
    fi
}

# 1. Check Node.js
echo "1. Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js is installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js is NOT installed"
fi
echo ""

# 2. Check PM2
echo "2. Checking PM2..."
if command -v pm2 &> /dev/null; then
    echo -e "${GREEN}✓${NC} PM2 is installed"
    echo "   PM2 Processes:"
    pm2 list
else
    echo -e "${RED}✗${NC} PM2 is NOT installed"
fi
echo ""

# 3. Check Nginx
echo "3. Checking Nginx..."
if command -v nginx &> /dev/null; then
    NGINX_VERSION=$(nginx -v 2>&1)
    echo -e "${GREEN}✓${NC} Nginx is installed: $NGINX_VERSION"
    check_service nginx
else
    echo -e "${RED}✗${NC} Nginx is NOT installed"
fi
echo ""

# 4. Check Nginx Configuration
echo "4. Checking Nginx Configuration..."
if sudo nginx -t 2>&1 | grep -q "successful"; then
    echo -e "${GREEN}✓${NC} Nginx configuration is valid"
    sudo nginx -t 2>&1 | tail -1
else
    echo -e "${RED}✗${NC} Nginx configuration has errors:"
    sudo nginx -t 2>&1 | grep -i error || true
fi
echo ""

# 5. Check Port 4000 (Next.js)
echo "5. Checking Next.js Port (4000)..."
check_port 4000
echo ""

# 6. Check Port 80 (HTTP)
echo "6. Checking HTTP Port (80)..."
check_port 80
echo ""

# 7. Check Port 443 (HTTPS)
echo "7. Checking HTTPS Port (443)..."
check_port 443
echo ""

# 8. Check Firewall
echo "8. Checking Firewall (UFW)..."
if command -v ufw &> /dev/null; then
    UFW_STATUS=$(sudo ufw status | head -1)
    echo "   Status: $UFW_STATUS"
    sudo ufw status | grep -E "OpenSSH|Nginx|80|443" || true
else
    echo -e "${YELLOW}⚠${NC} UFW is not installed"
fi
echo ""

# 9. Test Local Next.js Connection
echo "9. Testing Local Next.js Connection..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:4000 | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✓${NC} Next.js is responding on localhost:4000"
else
    echo -e "${RED}✗${NC} Next.js is NOT responding on localhost:4000"
    echo "   Try: curl http://localhost:4000"
fi
echo ""

# 10. Check Nginx Logs (last 5 errors)
echo "10. Recent Nginx Errors (last 5)..."
if sudo tail -5 /var/log/nginx/error.log 2>/dev/null | grep -q "."; then
    sudo tail -5 /var/log/nginx/error.log | grep -i error || echo "   No recent errors"
else
    echo "   No error log found or empty"
fi
echo ""

# 11. Check PM2 Logs (last 5 lines)
echo "11. Recent PM2 Logs..."
if pm2 list | grep -q "unitydevs4000"; then
    echo "   Last 5 log lines for unitydevs4000:"
    pm2 logs unitydevs4000 --lines 5 --nostream --err 2>/dev/null || pm2 logs unitydevs4000 --lines 5 --nostream 2>/dev/null || echo "   No logs available"
else
    echo -e "${YELLOW}⚠${NC} PM2 process 'unitydevs4000' not found"
fi
echo ""

# 12. Check DNS Resolution (if domain provided)
if [ $# -gt 0 ]; then
    DOMAIN=$1
    echo "12. Checking DNS for $DOMAIN..."
    DIG_RESULT=$(dig +short $DOMAIN 2>/dev/null || echo "")
    SERVER_IP=$(curl -s ifconfig.me || echo "unknown")
    
    if [ -n "$DIG_RESULT" ]; then
        echo "   DNS resolves to: $DIG_RESULT"
        echo "   Server IP: $SERVER_IP"
        if [ "$DIG_RESULT" = "$SERVER_IP" ]; then
            echo -e "${GREEN}✓${NC} DNS points to this server"
        else
            echo -e "${YELLOW}⚠${NC} DNS does NOT point to this server"
            echo "   Update your DNS A record to point to: $SERVER_IP"
        fi
    else
        echo -e "${YELLOW}⚠${NC} Could not resolve DNS for $DOMAIN"
    fi
    echo ""
fi

# 13. Test External Connection (if domain provided)
if [ $# -gt 0 ]; then
    DOMAIN=$1
    echo "13. Testing External Connection to $DOMAIN..."
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://$DOMAIN 2>/dev/null || echo "000")
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
        echo -e "${GREEN}✓${NC} Site is accessible (HTTP $HTTP_CODE)"
    elif [ "$HTTP_CODE" = "000" ]; then
        echo -e "${RED}✗${NC} Connection timeout or unreachable"
        echo "   Check firewall, DNS, and Nginx configuration"
    else
        echo -e "${YELLOW}⚠${NC} Unexpected response (HTTP $HTTP_CODE)"
    fi
    echo ""
fi

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Quick Troubleshooting Commands:"
echo ""
echo "   View PM2 logs:       pm2 logs unitydevs4000"
echo "   View Nginx errors:   sudo tail -f /var/log/nginx/error.log"
echo "   Restart PM2:         pm2 restart unitydevs4000"
echo "   Reload Nginx:        sudo systemctl reload nginx"
echo "   Test Nginx config:   sudo nginx -t"
echo "   Check port 4000:     sudo ss -tlnp | grep 4000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Verification Complete!"
echo ""

