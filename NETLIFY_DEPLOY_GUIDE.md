# Netlify Deployment Guide for AegisExpress Logistics

## Quick Deploy Options

### Option 1: Deploy from GitHub (Recommended)

1. **Connect Repository to Netlify:**

   - Go to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose GitHub and authorize Netlify
   - Select your repository: `RabbitDaCoder/ExpressLogistics`

2. **Build Settings:**

   ```
   Base directory: client
   Build command: npm run build
   Publish directory: client/dist
   ```

3. **Environment Variables:**
   Copy from `NETLIFY_ENV_VARS.txt` and add in Netlify dashboard:
   - Site settings → Environment variables
   - Add each variable from the file

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**

   ```bash
   netlify login
   ```

3. **Deploy from client directory:**
   ```bash
   cd client
   netlify deploy --prod --dir=dist
   ```

### Option 3: Drag & Drop Deploy

1. **Build locally:**

   ```bash
   cd client
   npm install --legacy-peer-deps
   npm run build
   ```

2. **Drag the `dist` folder to Netlify dashboard**

## Configuration Files Created

- `client/netlify.toml` - Netlify build configuration
- `NETLIFY_ENV_VARS.txt` - Environment variables list

## Key Features Configured

✅ **SPA Routing** - All routes redirect to index.html  
✅ **Build Optimization** - CSS/JS minification and bundling  
✅ **Security Headers** - XSS protection, frame options, etc.  
✅ **Cache Control** - Optimized caching for static assets  
✅ **Node.js 18** - Stable Node version for builds  
✅ **Legacy Peer Deps** - Handles npm dependency conflicts

## Post-Deployment Steps

1. **Update API URL:**

   - Set `VITE_API_URL` to your Render API URL
   - Example: `https://your-api-name.onrender.com/api`

2. **Configure Custom Domain (Optional):**

   - Site settings → Domain management
   - Add your custom domain

3. **Set up Branch Deploys:**
   - Deploys → Deploy contexts
   - Configure preview deployments

## Build Troubleshooting

If build fails:

1. **Check build logs** in Netlify dashboard
2. **Clear cache** in Site settings → Build & deploy
3. **Try manual deploy** with Netlify CLI
4. **Verify environment variables** are set correctly

## Performance Optimization

- Static assets cached for 1 year
- HTML/CSS/JS minified automatically
- Pretty URLs enabled
- Gzip compression enabled by default

## Security Features

- XSS protection headers
- Content type sniffing prevention
- Frame clickjacking protection
- Strict referrer policy

Your site will be available at: `https://your-site-name.netlify.app`
