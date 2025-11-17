Absolutely! I can summarize the whole deployment process we discussed into a **concise, step-by-step README** for deploying a Next.js project on an **Oracle Always Free Ubuntu instance**, including PM2, Nginx, SSL, firewall rules, and Cloudflare domain setup. Here's a ready-to-use README:

---

# Deployment Guide: Next.js Project on Oracle Always Free Ubuntu Instance

This README provides step-by-step instructions to deploy a Next.js project (using PM2 and Nginx) on an Oracle Cloud Always Free Ubuntu instance, including domain setup via Cloudflare and firewall configuration.

---

## **1. Create and Prepare Oracle Free Instance**

1. Launch an **Ubuntu 22.04** instance in Oracle Cloud (Always Free).
2. Ensure **public IP** is attached.
3. Update and upgrade packages:

```bash
sudo apt update && sudo apt upgrade -y
```

4. Install required packages:

```bash
sudo apt install git curl build-essential ufw nginx certbot python3-certbot-nginx -y
```

---

## **2. Configure Swap (Optional if RAM is low)**

If your instance has 1GB RAM and you want a larger swap (e.g., 4GB):

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo sh -c 'echo "/swapfile none swap sw 0 0" >> /etc/fstab'
```

---

## **3. Clone Next.js Project**

```bash
cd ~
git clone https://github.com/devfeb16/my-game-dev-portfolio.git
cd my-game-dev-portfolio
npm install
```

---

## **4. Set up PM2 to run the Next.js app**

1. Install PM2 globally:

```bash
sudo npm install pm2@latest -g
```

2. Start the Next.js project via PM2:

```bash
pm2 start npm --name unitydevs4000 -- run start -- -p 4000 -H 0.0.0.0
pm2 save
pm2 logs unitydevs4000
```

3. Ensure the project is listening on `0.0.0.0:4000`:

```bash
sudo ss -tulnp | grep 4000
```

---

## **5. Configure Nginx**

1. Backup default Nginx site:

```bash
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
sudo truncate -s 0 /etc/nginx/sites-available/default
```

2. Edit the Nginx config for Next.js:

```bash
sudo nano /etc/nginx/sites-available/default
```

Add:

```nginx
server {
    listen 80;
    server_name unitydevs.com www.unitydevs.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static/ {
        alias /home/ubuntu/my-game-dev-portfolio/.next/static/;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

3. Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## **6. Configure Firewall Rules (iptables / UFW)**

1. Check UFW status:

```bash
sudo ufw status
```

2. Allow HTTP/HTTPS traffic:

```bash
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -L -n -v
```

3. (Optional) Enable UFW if using it:

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## **7. Configure SSL with Certbot**

1. Install Certbot (already installed in Step 1).
2. Run Certbot to get SSL:

```bash
sudo certbot --nginx -d unitydevs.com -d www.unitydevs.com
```

* If certificate already exists, choose option `1` to reinstall it.

3. Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## **8. Cloudflare DNS Setup**

1. Point your domain `unitydevs.com` and `www.unitydevs.com` to the public IP:

| Type | Name | Content        | Proxy Status |
| ---- | ---- | -------------- | ------------ |
| A    | @    | 161.118.185.86 | Proxied      |
| A    | www  | 161.118.185.86 | Proxied      |

2. Ensure **SSL/TLS mode** in Cloudflare is **Full**.
3. Optional: Disable caching temporarily to debug `_next/static` assets.

---

## **9. Testing the Setup**

1. Test IP:

```bash
curl -I http://161.118.185.86
```

2. Test domain:

```bash
curl -I https://unitydevs.com
```

3. Check PM2 logs:

```bash
pm2 logs unitydevs4000
```

4. Browser: open `https://unitydevs.com` and check if CSS/JS is loading correctly.

* If `_next/static` files fail, double-check Nginx `_next/static/` alias path.

---

## **10. Notes and Troubleshooting**

* Ensure **PM2 process is running** and listening on `0.0.0.0:<port>`.
* Check **Nginx is properly proxying** to the correct port.
* Use `sudo ss -tulnp` to see listening ports.
* For SSL issues, verify Cloudflare SSL mode and Nginx certificates.
* If JS/CSS isn’t loading, confirm `_next/static/` alias in Nginx matches project path.

---

✅ With these steps, your Next.js project should be:

* Accessible via public IP (`http://161.118.185.86`)
* Accessible via domain (`https://unitydevs.com`)
* Serving full Next.js assets (JS/CSS/animations)
* Running under PM2 and Nginx with SSL

---

If you want, I can also **create a ready-to-copy Nginx config file specifically for this project** that guarantees `_next` assets load perfectly, which will eliminate all JS/CSS issues.

Do you want me to do that next?
