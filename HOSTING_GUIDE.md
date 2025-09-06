# Hosting & Deployment Guide

This guide explains how to host the AegisExpress Logistics application and connect the client to the API.

## Overview

The application consists of two parts:

- **Frontend (Client)**: React TypeScript application
- **Backend (API)**: Node.js Express server

## Local Development Setup

### Prerequisites

1. **Node.js** (v18+ recommended)
2. **npm** or **yarn**
3. **MongoDB** (Atlas or local)
4. **Redis** (Upstash or local)

### Environment Setup

1. **Clone the repository:**

```bash
git clone https://github.com/RabbitDaCoder/ExpressLogistics.git
cd ExpressLogistics
```

2. **Setup API Environment:**

```bash
cd api
cp .env.example .env
```

Edit `api/.env`:

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/logisticsDB

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES=7d

# Redis
REDIS_URL=redis://localhost:6379

# Admin Seeding
ADMIN_SEED_TOKEN=CHANGE_ME
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=Rabbit522@

# Email (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
```

3. **Setup Client Environment:**

```bash
cd ../client
```

Create `client/.env.local`:

```env
VITE_API_URL=http://localhost:5000
```

### Running Locally

1. **Start API Server:**

```bash
cd api
npm install
npm run dev
```

2. **Start Client:**

```bash
cd ../client
npm install
npm run dev
```

3. **Seed Initial Admin:**

```bash
cd api
npm run dev -- --seed-admin
```

4. **Access Application:**
   - Client: http://localhost:5173
   - API: http://localhost:5000
   - Admin: http://localhost:5173/owner/login

---

## Production Hosting Options

### Option 1: Render (API) + Vercel (Client)

#### API Deployment on Render

1. **Create Render Account**: https://render.com
2. **Connect GitHub**: Link your repository
3. **Create Web Service**:

   - **Build Command**: `cd api && npm install`
   - **Start Command**: `cd api && npm start`
   - **Environment**: Node.js
   - **Instance Type**: Free tier available

4. **Environment Variables** (in Render dashboard):

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://...
JWT_SECRET=production_secret_here
REDIS_URL=rediss://...
CLIENT_ORIGIN=https://your-frontend-domain.vercel.app
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=Passw0rd!
```

#### Client Deployment on Vercel

1. **Create Vercel Account**: https://vercel.com
2. **Import GitHub Repository**
3. **Configuration**:

   - **Framework**: React
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Environment Variables** (in Vercel dashboard):

```env
VITE_API_URL=https://your-api-name.onrender.com
```

### Option 2: Railway (Full Stack)

1. **Create Railway Account**: https://railway.app
2. **Deploy from GitHub**:
   - Select monorepo option
   - Configure separate services for API and Client

### Option 3: Heroku (API) + Netlify (Client)

#### API on Heroku

1. Create Heroku app
2. Set buildpack to Node.js
3. Configure environment variables
4. Deploy via GitHub integration

#### Client on Netlify

1. Create Netlify account
2. Connect GitHub repository
3. Set build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Atlas Account**: https://mongodb.com/atlas
2. **Create Cluster**:
   - Choose free tier (M0)
   - Select closest region
3. **Configure Access**:
   - Add database user
   - Configure IP whitelist (0.0.0.0/0 for production)
4. **Get Connection String**:
   - Replace `<password>` and `<dbname>`
   - Add to MONGO_URI environment variable

### Redis Setup

#### Upstash Redis (Recommended)

1. **Create Upstash Account**: https://upstash.com
2. **Create Redis Database**:
   - Choose free tier
   - Select closest region
3. **Copy Connection Details**:
   - Get REDIS_URL from dashboard
   - Add to environment variables

---

## Client-API Connection

### Environment Configuration

The client connects to the API via environment variables:

**Development:**

```env
# client/.env.local
VITE_API_URL=http://localhost:5000
```

**Production:**

```env
# Vercel environment variables
VITE_API_URL=https://your-api-domain.onrender.com
```

### API Configuration

The API must allow client origins:

```javascript
// api/app.js
app.use(
  cors({
    origin: [
      process.env.CLIENT_ORIGIN || "http://localhost:5173",
      "https://your-frontend-domain.vercel.app",
      // Add your production client URL
    ],
    credentials: true,
  })
);
```

### Testing Connection

1. **Health Check API:**

```bash
curl https://your-api-domain.onrender.com/api/health
```

2. **Client API Test:**
   - Open browser developer tools
   - Check Network tab for API calls
   - Verify requests go to correct API URL

---

## SSL/HTTPS Setup

### Automatic SSL

- **Vercel**: Automatic SSL for custom domains
- **Render**: Automatic SSL for .onrender.com domains
- **Netlify**: Automatic SSL with Let's Encrypt

### Custom Domain Setup

1. **API Custom Domain** (Render):

   - Add custom domain in dashboard
   - Update DNS CNAME records
   - SSL automatically provisioned

2. **Client Custom Domain** (Vercel):
   - Add domain in project settings
   - Configure DNS records
   - SSL automatically handled

---

## Security Considerations

### Environment Variables

- Never commit `.env` files to Git
- Use different secrets for production
- Rotate JWT secrets regularly

### CORS Configuration

```javascript
// Restrict origins in production
origin: ["https://yourdomain.com", "https://www.yourdomain.com"];
```

### Rate Limiting

```javascript
// Already configured in app.js
const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});
```

---

## Monitoring & Maintenance

### Health Checks

- **API**: GET `/api/health`
- **Database**: Connection status in health endpoint
- **Redis**: Connection status in health endpoint

### Logging

- Check platform logs (Render/Vercel dashboards)
- Monitor error rates
- Set up alerts for downtime

### Updates

1. **Development**: Test changes locally
2. **Staging**: Deploy to staging environment
3. **Production**: Deploy via GitHub push (automatic)

---

## Troubleshooting

### Common Issues

1. **CORS Errors**:

   - Check CLIENT_ORIGIN environment variable
   - Verify API CORS configuration
   - Ensure HTTPS/HTTP consistency

2. **Database Connection**:

   - Verify MONGO_URI format
   - Check Atlas IP whitelist
   - Test connection string locally

3. **Build Failures**:

   - Check Node.js version compatibility
   - Verify all dependencies in package.json
   - Review build logs in platform dashboard

4. **API Not Responding**:
   - Check server logs
   - Verify environment variables
   - Test health endpoint

### Debug Commands

**Local Testing:**

```bash
# Test API health
curl http://localhost:5000/api/health

# Test client build
cd client && npm run build

# Check API logs
cd api && npm run dev
```

**Production Testing:**

```bash
# Test production API
curl https://your-api.onrender.com/api/health

# Test client connection
curl https://your-client.vercel.app
```

---

## Deployment Checklist

### Pre-deployment

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Redis connection tested
- [ ] Build process verified
- [ ] API health endpoint working

### Post-deployment

- [ ] Health check passes
- [ ] Admin login works
- [ ] Client-API connection verified
- [ ] Email functionality tested (if configured)
- [ ] SSL certificates active
- [ ] Custom domains configured (if applicable)

### Maintenance

- [ ] Regular backups configured
- [ ] Monitoring alerts set up
- [ ] Update schedule planned
- [ ] Error tracking implemented
