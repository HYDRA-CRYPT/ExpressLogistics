# GitHub Actions Workflows

## Disabled Workflows

The following workflows have been disabled by renaming them with `.disabled` extension:

- `deploy.yml.disabled` - Main deployment workflow for Render (API) and Vercel (Client)
- `preview.yml.disabled` - Preview deployment workflow for pull requests

## Why Disabled?

These workflows were disabled because:

- The associated Vercel and Render accounts are suspended
- The deployment secrets are tied to different accounts
- Prevents failed deployments on every push

## Re-enabling

To re-enable these workflows:

1. Set up new hosting accounts (Vercel, Render, Netlify, etc.)
2. Configure the required secrets in GitHub repository settings
3. Rename the files back to `.yml` extension
4. Update the deployment URLs and configuration as needed

## Alternative Deployment

Consider using:

- **Vercel** (for client) - Free tier available
- **Render** (for API) - Free tier available
- **Netlify** (for client) - Free tier available
- **Railway** (for API) - Free tier available
- **Heroku** (for API) - Limited free options
