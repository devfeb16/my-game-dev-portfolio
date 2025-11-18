# Authentication & Blog Management Setup

This project includes a complete authentication system with role-based access control and blog management functionality.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/my-game-dev-portfolio

# JWT Secret for authentication (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin User Credentials (optional - defaults provided)
# The admin user is automatically created on first database connection
ADMIN_EMAIL=admin@UnityDevs.com
ADMIN_PASSWORD=temp123
ADMIN_NAME=Admin User

# Optional: NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this
```

## User Roles

The system supports the following user roles:

- **admin**: Full access to all features
- **marketing**: Access to blogs, analytics
- **blogger**: Can create and manage blogs
- **user**: Basic access

## Features

### Authentication
- User registration and login
- Session management with JWT tokens
- HTTP-only cookies for secure token storage
- Role-based access control
- Password hashing with bcrypt

### Blog Management
- Create, read, update, delete blogs
- Role-based blog access
- Slug generation
- Tags and categories
- Featured images
- Publishing status
- View tracking

### Dashboard
- Role-specific dashboards
- Responsive sidebar navigation
- Overview with statistics
- Analytics (admin/marketing)
- User management (admin only)
- Settings page

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Get current session

### Blogs
- `GET /api/blogs` - Get all blogs (with pagination)
- `POST /api/blogs` - Create a new blog (auth required)
- `GET /api/blogs/[id]` - Get a specific blog
- `PUT /api/blogs/[id]` - Update a blog (owner/admin only)
- `DELETE /api/blogs/[id]` - Delete a blog (owner/admin only)

## Getting Started

1. Ensure MongoDB is running locally or update `MONGODB_URI` with your connection string
2. Create `.env.local` file with the environment variables
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. **The admin user is automatically created** on first database connection - no manual setup needed!
6. Navigate to `/login` to login with admin credentials

### Automatic Admin Initialization

The admin user is **automatically created** when the application first connects to the database. You don't need to run any scripts or call any endpoints manually.

**Default Admin Credentials:**
- **Email:** `admin@UnityDevs.com` (or set `ADMIN_EMAIL` in `.env.local`)
- **Password:** `temp123` (or set `ADMIN_PASSWORD` in `.env.local`)
- **Name:** `Admin User` (or set `ADMIN_NAME` in `.env.local`)

**To customize admin credentials**, add these to your `.env.local`:
```env
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Your Admin Name
```

### Manual Admin Setup (Optional)

If you need to manually create or reset the admin user:
- **Option A**: Run the seed script: `npm run seed-admin`
- **Option B**: Call the API endpoint: `POST /api/admin/init-admin`
- **Option C**: Use the ensure-admin endpoint: `POST /api/admin/ensure-admin`

## Default Admin Credentials

**Email:** `admin@UnityDevs.com`  
**Password:** `temp123`

⚠️ **Important:** Change the default password after first login for security.

### Troubleshooting Login Issues

If you're having trouble logging in:

1. **Ensure the admin user exists:**
   ```bash
   # Run the seed script
   npm run seed-admin
   
   # Or call the ensure-admin endpoint (resets password if needed)
   curl -X POST http://localhost:3000/api/admin/ensure-admin
   ```

2. **Check the database:** Make sure MongoDB is running and the connection string is correct

3. **Verify email case:** The email is stored in lowercase, so `admin@UnityDevs.com` becomes `admin@unitydevs.com` in the database

4. **Check server logs:** Look for error messages in the terminal when attempting to login

## Database Models

### User Model
- email (unique, required)
- password (hashed, required)
- name (required)
- role (enum: admin, marketing, blogger, user)
- timestamps

### Blog Model
- title (required)
- content (required)
- excerpt (optional)
- slug (unique, auto-generated)
- author (reference to User)
- featuredImage (optional)
- tags (array)
- published (boolean)
- publishedAt (date, auto-set when published)
- views (number)
- timestamps

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens stored in HTTP-only cookies
- Role-based API route protection
- CSRF protection via sameSite cookies
- Secure password requirements (minimum 6 characters)

