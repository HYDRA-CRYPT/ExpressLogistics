# 🚀 Quick Deployment Guide - AegisExpress Logistics

## Manual Deployment (Recommended for First Time)

### Step 1: Deploy API to Render

#### A. Sign up for Render

1. Go to [render.com](https://render.com) and sign up
2. Connect your GitHub account
3. Import your `aegis-express` repository

#### B. Create Web Service

1. Click "New +" → "Web Service"
2. Select your `ExpressLogistics` repository
3. Configure the service:

```yaml
Name: aegis-express-api
Environment: Node
Region: Oregon (US-West)
Branch: main
Build Command: cd api && npm install
Start Command: cd api && npm start
Plan: Free (for testing)
```

#### C. Add Environment Variables

In the Render dashboard, add these environment variables:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://techagbadev:7X7Vql0Q0t2gZVOv@aegisexpresslogistics.nj62fnk.mongodb.net/logisticsDB?retryWrites=true&w=majority&appName=AegisExpressLogistics
JWT_SECRET=your_secure_jwt_secret_here_change_in_production
JWT_EXPIRES=7d
REDIS_URL=rediss://default:AdZnAAIncDFkYzg1MTViMzVmMGI0MTFhYjhmZGQxMTczOTk5OTYzNnAxNTQ4ODc@full-skylark-54887.upstash.io:6379
EMAIL_USER=techagbadev@gmail.com
EMAIL_PASS=zimtqbuzrypfmkgk
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
FROM_EMAIL=boltdropa@gmail.com
CLOUDINARY_CLOUD_NAME=dk1cria0z
CLOUDINARY_API_KEY=747368826295982
CLOUDINARY_API_SECRET=HbljlQwEoDR6ndvo98KNQy6Lbyk
FRONTEND_URL=https://your-app-name.vercel.app
```

#### D. Deploy API

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note your API URL: `https://your-service-name.onrender.com`

---

### Step 2: Deploy Client to Vercel

#### A. Sign up for Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Import your `ExpressLogistics` repository

#### B. Configure Project

```yaml
Framework Preset: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### C. Add Environment Variables

```env
VITE_API_URL=https://your-render-api-url.onrender.com/api
VITE_CLOUDINARY_CLOUD_NAME=dk1cria0z
VITE_CLOUDINARY_UPLOAD_PRESET=delivery_invoices
```

#### D. Deploy Client

1. Click "Deploy"
2. Wait for deployment (3-5 minutes)
3. Note your app URL: `https://your-app-name.vercel.app`

---

### Step 3: Update Configuration

#### Update API with Client URL

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable:

```env
FRONTEND_URL=https://your-app-name.vercel.app
```

3. Redeploy the API service

---

## Quick Test Commands

### Test API Health

```bash
curl https://your-api-url.onrender.com/api/health
```

### Test Client

Open your Vercel URL in browser and test:

1. Home page loads
2. Tracking input works
3. Admin login works

---

## Alternative: One-Click Deploy

### Render Deploy Button

Click this button to deploy API instantly:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/RabbitDaCoder/ExpressLogistics)

### Vercel Deploy Button

Click this button to deploy Client instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RabbitDaCoder/ExpressLogistics&root-directory=client&env=VITE_API_URL&envDescription=API%20endpoint%20URL&envLink=https://your-api.onrender.com/api)

---

## Troubleshooting

### Common Issues

#### 1. API Build Fails with npm ci Error

**Solution:** The render.yaml is configured to use `npm install` instead of `npm ci`

#### 2. Client Can't Connect to API

**Solution:** Check CORS settings and update `FRONTEND_URL` in API environment variables

#### 3. Email Service Not Working

**Solution:** Verify SMTP credentials in Render environment variables

#### 4. PDF Generation Fails

**Solution:** Check Cloudinary credentials in both API and Client

---

## Success URLs

After successful deployment, you should have:

- **API**: `https://aegis-express-api.onrender.com`
- **Client**: `https://aegis-express.vercel.app`
- **Admin Panel**: `https://aegis-express.vercel.app/admin`

---

## Next Steps

1. Test all functionality
2. Set up custom domain (optional)
3. Configure monitoring and alerts
4. Set up automated deployments via GitHub Actions
5. Scale to paid plans for production traffic

---

**🎉 Congratulations! Your AegisExpress Logistics system is now live!**
