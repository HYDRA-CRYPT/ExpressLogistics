# Environment Variables Configuration

## Overview

This React application uses Vite environment variables for configuration. All client-side environment variables must be prefixed with `VITE_` to be accessible in the browser.

## File Structure

- `.env.development` - Development environment variables
- `.env.production` - Production environment variables (template only)
- `.env.example` - Template file for new developers
- `.env.local` - Local overrides (not committed to git)

## Required Variables

### API Configuration

```bash
VITE_API_BASE_URL=http://localhost:5000/api  # Development
VITE_API_BASE_URL=https://your-api-domain.com/api  # Production
```

## Vercel Deployment Setup

### Method 1: Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-api-domain.com/api`
   - **Environment**: Production (or specify environment)

### Method 2: Vercel CLI

```bash
vercel env add VITE_API_BASE_URL
# Enter the value when prompted
```

### Method 3: vercel.json Configuration

Add to vercel.json:

```json
{
  "env": {
    "VITE_API_BASE_URL": "https://your-api-domain.com/api"
  }
}
```

## Usage in Code

```typescript
// Access environment variables in your React components
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Check if in production
const isProduction = import.meta.env.PROD;

// Check if in development
const isDevelopment = import.meta.env.DEV;
```

## Security Notes

- ⚠️ **Client-side variables are public** - Never store secrets in VITE\_ variables
- ✅ Use VITE\_ prefix for public configuration only
- ✅ API keys and secrets should be handled by your backend API
- ✅ Always validate environment variables in your code

## Local Development

1. Copy `.env.example` to `.env.local`
2. Update the values for your local setup
3. The app will automatically use these variables

## Troubleshooting

- Variables not loading? Check the `VITE_` prefix
- Build issues? Ensure variables are set in Vercel dashboard
- Local development issues? Check `.env.local` file exists and has correct values
