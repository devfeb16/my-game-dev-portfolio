# Deployment Guide - Next.js on DigitalOcean Ubuntu Droplet

This guide will help you properly set up your Next.js application on a DigitalOcean Ubuntu droplet with Nginx as a reverse proxy.

## Prerequisites

- DigitalOcean droplet (Ubuntu 20.04 or later)
- Domain name (e.g., unitydevs.com) pointing to your droplet's IP
- SSH access to your droplet
- Basic knowledge of Linux commands

## Step 1: Initial Server Setup

### 1.1 Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Install Node.js and npm

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

### 1.3 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
pm2 startup  # Follow the instructions to enable PM2 on system boot
```

### 1.4 Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.5 Configure Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## Step 2: Domain Configuration

### 2.1 Point Domain to Droplet

1. Go to your domain registrar (e.g., Namecheap, GoDaddy)
2. Add/Update A record:
   - Type: `A`
   - Host: `@` or blank
   - Value: Your droplet's IP address
   - TTL: `3600` (or default)

3. Optional: Add www subdomain:
   - Type: `A`
   - Host: `www`
   - Value: Your droplet's IP address
   - TTL: `3600`

### 2.2 Verify DNS Propagation

```bash
# Check if domain points to your IP
dig unitydevs.com +short
# or
nslookup unitydevs.com
```

## Step 3: Deploy Your Next.js Application

### 3.1 Clone/Upload Your Project

```bash
cd /var/www
sudo mkdir -p unitydevs
sudo chown -R $USER:$USER /var/www/unitydevs
cd /var/www/unitydevs

# If using Git:
git clone <your-repo-url> .

# Or upload via SCP from your local machine:
# scp -r ./my-game-dev-portfolio user@your-server-ip:/var/www/unitydevs/
```

### 3.2 Install Dependencies

```bash
cd /var/www/unitydevs
npm install
```

### 3.3 Create Environment File

```bash
nano .env.local
```

Add your environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/my-game-dev-portfolio
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
PORT=4000
```

Save and exit (Ctrl+X, Y, Enter)

### 3.4 Build the Application

```bash
npm run build
```

### 3.5 Start with PM2

```bash
pm2 start npm --name "unitydevs4000" -- start -- -p 4000
pm2 save
pm2 list
```

### 3.6 View Logs

```bash
pm2 logs unitydevs4000
```

## Step 4: Configure Nginx Reverse Proxy

### 4.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/unitydevs.com
```

Add the following configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name unitydevs.com www.unitydevs.com;

    # Redirect HTTP to HTTPS (optional, after SSL setup)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Increase body size limit for file uploads
    client_max_body_size 10M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

Save and exit.

### 4.2 Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/unitydevs.com /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

### 4.3 Check Nginx Status

```bash
sudo systemctl status nginx
```

## Step 5: Configure SSL with Let's Encrypt (Recommended)

### 5.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 5.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d unitydevs.com -d www.unitydevs.com
```

Follow the prompts to:
- Enter your email
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 5.3 Auto-renewal Setup

Certbot automatically sets up auto-renewal. Test it:

```bash
sudo certbot renew --dry-run
```

## Step 6: Troubleshooting Common Issues

### Issue 1: Timeout Errors

**Symptoms:** Connection timeout when accessing the site

**Solutions:**

1. **Check if Next.js is running:**
   ```bash
   pm2 list
   pm2 logs unitydevs4000
   ```

2. **Check if Nginx is running:**
   ```bash
   sudo systemctl status nginx
   ```

3. **Verify Nginx configuration:**
   ```bash
   sudo nginx -t
   ```

4. **Check if port 4000 is listening:**
   ```bash
   sudo netstat -tlnp | grep 4000
   # or
   sudo ss -tlnp | grep 4000
   ```

5. **Check firewall:**
   ```bash
   sudo ufw status
   sudo ufw allow 4000/tcp  # If needed (not recommended - use Nginx instead)
   ```

6. **Check Nginx error logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

7. **Test direct access to Next.js:**
   ```bash
   curl http://localhost:4000
   ```

### Issue 2: Domain Not Resolving

**Symptoms:** Can't reach the site via domain, but works with IP

**Solutions:**

1. **Check DNS propagation:**
   ```bash
   dig unitydevs.com +short
   nslookup unitydevs.com
   ```

2. **Wait for DNS propagation** (can take up to 48 hours, usually 1-2 hours)

3. **Clear local DNS cache:**
   ```bash
   # On Windows:
   ipconfig /flushdns
   
   # On Mac:
   sudo dscacheutil -flushcache
   
   # On Linux:
   sudo systemd-resolve --flush-caches
   ```

### Issue 3: 502 Bad Gateway

**Symptoms:** Nginx returns 502 error

**Solutions:**

1. **Next.js app not running:**
   ```bash
   pm2 restart unitydevs4000
   pm2 logs unitydevs4000
   ```

2. **Wrong port in Nginx config:**
   - Verify `proxy_pass http://localhost:4000;` matches your Next.js port

3. **Check if MongoDB is running** (if using local MongoDB):
   ```bash
   sudo systemctl status mongod
   ```

### Issue 4: Environment Variables Not Loading

**Solution:**

1. Ensure `.env.local` exists and has correct values
2. Restart PM2:
   ```bash
   pm2 restart unitydevs4000 --update-env
   ```

### Issue 5: Build Errors

**Solutions:**

1. **Check Node.js version:**
   ```bash
   node --version  # Should be 18.x or 20.x
   ```

2. **Clear cache and rebuild:**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

3. **Check for missing dependencies:**
   - Ensure all packages in `package.json` are installed

## Step 7: Verification Checklist

Run these commands to verify everything is set up correctly:

```bash
# 1. Check if Next.js is running
pm2 list

# 2. Check if Nginx is running
sudo systemctl status nginx

# 3. Check if port 4000 is listening
sudo ss -tlnp | grep 4000

# 4. Test Nginx configuration
sudo nginx -t

# 5. Check Nginx access logs
sudo tail -f /var/log/nginx/access.log

# 6. Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# 7. Test local Next.js app
curl http://localhost:4000

# 8. Test through Nginx (replace with your domain)
curl http://unitydevs.com
```

## Step 8: Monitoring and Maintenance

### View Application Logs

```bash
pm2 logs unitydevs4000
pm2 logs unitydevs4000 --lines 100  # Last 100 lines
pm2 logs unitydevs4000 --err        # Only errors
```

### Restart Application

```bash
pm2 restart unitydevs4000
pm2 restart unitydevs4000 --update-env  # If env vars changed
```

### Reload Nginx (no downtime)

```bash
sudo nginx -t  # Test first
sudo systemctl reload nginx
```

### Update Application

```bash
cd /var/www/unitydevs
git pull  # If using Git
npm install
npm run build
pm2 restart unitydevs4000 --update-env
```

## Quick Debugging Commands

```bash
# Check all services status
pm2 status && sudo systemctl status nginx && sudo ufw status

# View real-time logs
pm2 logs unitydevs4000 --lines 50 && sudo tail -f /var/log/nginx/error.log

# Test connectivity
curl -I http://localhost:4000
curl -I http://unitydevs.com

# Check processes
ps aux | grep node
ps aux | grep nginx
```

## Common Nginx Config Issues

1. **Wrong server_name:** Ensure it matches your domain exactly
2. **Wrong proxy_pass port:** Must match your Next.js port (4000)
3. **Missing headers:** The X-Forwarded-* headers are important for Next.js
4. **Firewall blocking:** Ensure UFW allows Nginx
5. **SELinux issues:** (Not common on Ubuntu, but check on CentOS/RHEL)

## Need Help?

If you're still experiencing issues:

1. Check PM2 logs: `pm2 logs unitydevs4000`
2. Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify DNS: `dig unitydevs.com`
4. Test local connection: `curl http://localhost:4000`
5. Check firewall: `sudo ufw status`

For DigitalOcean-specific issues, check their community tutorials and documentation.

