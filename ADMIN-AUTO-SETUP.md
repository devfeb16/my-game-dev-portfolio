# Automatic Admin User Setup

## Overview

The admin user is **automatically created** when your application first connects to the database. You don't need to run any scripts or manually execute any files.

## How It Works

1. When the app starts and connects to MongoDB, it automatically checks if an admin user exists
2. If no admin user exists, it creates one using the credentials from environment variables
3. If an admin user already exists, it skips creation (no duplicates)

## Configuration

### Default Credentials

If you don't set environment variables, the system uses these defaults:
- **Email:** `admin@UnityDevs.com`
- **Password:** `temp123`
- **Name:** `Admin User`

### Custom Credentials

To use custom admin credentials, add these to your `.env.local` file (or environment variables on your server):

```env
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password-here
ADMIN_NAME=Your Admin Name
```

## Deployment on Ubuntu Server

### Step 1: Set Environment Variables

On your Ubuntu server, set the environment variables in your `.env.local` file or in your PM2/process manager:

```bash
# In .env.local
ADMIN_EMAIL=admin@UnityDevs.com
ADMIN_PASSWORD=temp123
ADMIN_NAME=Admin User
```

Or if using PM2 with ecosystem file:
```javascript
{
  env: {
    ADMIN_EMAIL: 'admin@UnityDevs.com',
    ADMIN_PASSWORD: 'temp123',
    ADMIN_NAME: 'Admin User'
  }
}
```

### Step 2: Deploy and Start

Just deploy and start your application normally:

```bash
npm run build
pm2 start npm --name "your-app" -- start
```

The admin user will be automatically created on the first database connection.

### Step 3: Login

After deployment, you can immediately login with:
- **Email:** (whatever you set in `ADMIN_EMAIL` or default `admin@UnityDevs.com`)
- **Password:** (whatever you set in `ADMIN_PASSWORD` or default `temp123`)

## Security Best Practices

1. **Change Default Password**: After first login, change the password through the dashboard
2. **Use Strong Passwords**: Set a strong `ADMIN_PASSWORD` in production
3. **Use Environment Variables**: Never hardcode credentials in your code
4. **Restrict Access**: Only expose admin endpoints to trusted networks if possible

## Troubleshooting

### Admin User Not Created

If the admin user isn't created automatically:

1. **Check Database Connection**: Ensure MongoDB is running and `MONGODB_URI` is correct
2. **Check Server Logs**: Look for initialization messages in your server logs
3. **Manual Creation**: You can manually create it using:
   ```bash
   npm run seed-admin
   ```
   Or call: `POST /api/admin/ensure-admin`

### Login Issues

If you can't login:

1. **Verify Credentials**: Check your `.env.local` file matches what you're using to login
2. **Check Email Case**: Emails are stored lowercase, so `Admin@Example.com` becomes `admin@example.com`
3. **Reset Admin**: Use the ensure-admin endpoint to reset:
   ```bash
   curl -X POST http://your-domain.com/api/admin/ensure-admin
   ```

## Files Involved

- `lib/init-admin.js` - Admin initialization logic
- `lib/mongodb.js` - Auto-initializes admin on first connection
- `pages/api/admin/ensure-admin.js` - Manual admin creation/reset endpoint
- `pages/api/admin/init-admin.js` - Legacy admin creation endpoint
- `scripts/seed-admin.mjs` - Standalone seed script

## Notes

- The admin user is only created if it doesn't already exist
- Password is automatically hashed using bcrypt
- Email is automatically lowercased for consistency
- The initialization happens once per server instance (cached)

