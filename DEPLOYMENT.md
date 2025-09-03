# Aegis Express Logistics - Deployment Guide

## 🚀 CI/CD Architecture Overview

This monorepo uses a sophisticated CI/CD pipeline that deploys:

- **API** → Render (Backend services)
- **Client** → Vercel (Frontend application)

## 📁 Monorepo Structure Benefits

✅ **Single repository** for all code  
✅ **Coordinated deployments** across services  
✅ **Shared dependencies** and configurations  
✅ **Atomic commits** for full-stack features  
✅ **Simplified version management**

## 🔄 Deployment Workflow

### 1. **Smart Change Detection**

- Monitors `api/` and `client/` folders separately
- Only deploys changed components
- Reduces build times and costs

### 2. **Parallel Testing**

- API and Client tested simultaneously
- Fast feedback on build issues
- Prevents broken deployments

### 3. **Sequential Deployment**

- API deploys first (backend stability)
- Client deploys after API is healthy
- Health checks ensure service availability

## ⚙️ Setup Instructions

### 1. **GitHub Repository Secrets**

Add these secrets in your GitHub repository settings:

```env
# Render Configuration
RENDER_DEPLOY_HOOK_URL=https://api.render.com/deploy/srv-xxxxxxxxxx
API_URL=https://aegis-express-api.onrender.com

# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
CLIENT_URL=https://aegis-express.vercel.app

# Build Environment
VITE_API_URL_PRODUCTION=https://aegis-express-api.onrender.com/api
```

### 2. **Render Setup**

1. Connect your GitHub repository
2. Create a new Web Service
3. Configure build settings:
   - **Build Command**: `cd api && npm install`
   - **Start Command**: `cd api && npm start`
   - **Environment**: Node.js
4. Copy the deploy hook URL for GitHub secrets

### 3. **Vercel Setup**

1. Connect your GitHub repository
2. Set **Root Directory**: `client`
3. Framework preset: Vite
4. Environment variables:
   - `VITE_API_URL`: Your Render API URL
5. Generate deployment token for GitHub secrets

## 🌟 Key Features

### **Intelligent Deployments**

- Only deploys when relevant code changes
- Saves build minutes and reduces costs
- Faster feedback cycles

### **Preview Deployments**

- Automatic preview URLs for pull requests
- Test changes before merging
- Collaborative review process

### **Health Monitoring**

- Automatic health checks post-deployment
- Rollback on failure detection
- Uptime monitoring

### **Multi-Environment Support**

- **Development**: Local development
- **Preview**: PR-based previews
- **Production**: Main branch deployments

## 📊 Deployment Triggers

| Trigger           | API Deploy | Client Deploy | Preview |
| ----------------- | ---------- | ------------- | ------- |
| `api/` changes    | ✅         | ❌            | ❌      |
| `client/` changes | ❌         | ✅            | ✅      |
| Root changes      | ✅         | ✅            | ✅      |
| Pull Request      | ❌         | ❌            | ✅      |

## 🚨 Monitoring & Alerts

- **Build Status**: GitHub Actions notifications
- **Deploy Status**: Render + Vercel webhooks
- **Health Checks**: Automated API/Client verification
- **Error Tracking**: Failed deployment notifications

## 🔧 Custom Deployment Commands

```bash
# Manual deployment trigger
git push origin main

# Force deploy both services
git commit --allow-empty -m "Deploy: Force rebuild [deploy-all]"
git push origin main

# Deploy specific service
git commit -m "API: Update email service [deploy-api]"
git commit -m "Client: Update UI components [deploy-client]"
```

## 📈 Benefits of This Setup

1. **Cost Effective**: Only deploy what changes
2. **Fast Builds**: Parallel testing and deployment
3. **Reliable**: Health checks and rollback support
4. **Developer Friendly**: Preview deployments for testing
5. **Scalable**: Easy to add new services or environments

## 🛠️ Advanced Configuration

### Custom Build Scripts

```json
{
  "scripts": {
    "build:api": "cd api && npm run build",
    "build:client": "cd client && npm run build",
    "test:api": "cd api && npm test",
    "test:client": "cd client && npm test",
    "deploy:staging": "npm run build && deploy-staging.sh"
  }
}
```

### Environment-Specific Configs

- Development: Local MongoDB + Local Redis
- Staging: Cloud MongoDB + Redis Cloud
- Production: Production databases + CDN

This setup gives you enterprise-grade CI/CD while keeping costs low and deployments fast! 🚀
