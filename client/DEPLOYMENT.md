# Deployment Configuration

## Platform Compatibility

This project is configured to work with multiple deployment platforms:

- **Netlify**: Uses `netlify.toml` configuration
- **Vercel**: Uses `vercel.json` configuration
- **Other platforms**: Standard Vite build output in `dist/`

## Key Configuration Files

- `.nvmrc`: Node.js version (18)
- `.npmrc`: npm configuration for dependency resolution
- `package.json`: Includes optional dependencies for all Rollup native binaries
- `vite.config.ts`: Optimized build configuration with manual chunks

## Troubleshooting

### Rollup Native Binary Issues

If you encounter `Cannot find module @rollup/rollup-*` errors:

1. The project includes optional dependencies for all platforms
2. npm should automatically install the correct binary for the deployment platform
3. If issues persist, check that Node.js version is 18+ and npm is 9+

### Build Performance

- Build includes manual chunking for better performance
- Large chunk warnings are normal for this application size
- Consider implementing dynamic imports for further optimization

## Deployment Commands

### Netlify

```bash
npm ci && npm run build
```

### Vercel

```bash
npm ci && npm run build
```

### Manual Deployment

```bash
npm install
npm run build
# Deploy contents of dist/ folder
```
