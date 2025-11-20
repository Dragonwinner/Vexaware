# VEX Aware Backend API

This backend server handles both contact form submissions and newsletter subscriptions for the VEX Aware platform.

## Setup Instructions

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your email settings
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

## Newsletter API Setup

### Email Configuration (Choose One)

#### Option 1: Gmail (Recommended)
1. Enable 2-factor authentication
2. Generate App Password: Google Account → Security → App passwords  
3. Add to `.env`:
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   ```

#### Option 2: Custom SMTP
```env
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-password
```

### Frontend Integration
Update your frontend `.env`:
```env
VITE_NEWSLETTER_SERVICE=custom
VITE_API_URL=http://localhost:3001
```

## API Endpoints

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/confirm/:token` - Confirm email subscription
- `GET /api/newsletter/unsubscribe/:token` - Unsubscribe from newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers (admin)
- `GET /api/newsletter/stats` - Get subscription statistics

### Contact Forms
- `POST /api/contact` - Save a new contact submission
- `GET /api/contact` - Get all contact submissions
- `DELETE /api/contact` - Delete all contact submissions (admin)

### General
- `GET /api/health` - Server health check

## Database

- **Newsletter**: SQLite database (`database/newsletter.db`)
- **Contact Forms**: JSON files in `contactus/` folder

## Security Features

- ✅ Rate limiting (5 requests/minute per IP)
- ✅ Email validation
- ✅ CORS configuration  
- ✅ Security headers (Helmet)
- ✅ Admin key authentication

## Testing

```bash
# Health check
curl http://localhost:3001/api/health

# Newsletter subscription
curl -X POST http://localhost:3001/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Newsletter stats
curl http://localhost:3001/api/newsletter/stats
```

## Production Deployment

1. Set environment variables
2. Use PM2 process manager:
   ```bash
   pm2 start server.js --name "vexaware-api"
   ```
3. Configure reverse proxy
4. Enable HTTPS

Your complete backend API is ready! 🚀