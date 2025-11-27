# Vercel Deployment Guide

This guide will help you deploy your FinanciacionHipotecaria frontend to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- Your backend API deployed and accessible (or ready to deploy)

## Files Added for Deployment

The following files have been created to support Vercel deployment:

- `vercel.json` - Vercel configuration with routing rules
- `.vercelignore` - Files to exclude from deployment
- `.env` - Local environment variables (not committed to git)
- `.env.example` - Template for environment variables
- `src/config.ts` - API configuration management
- `.gitignore` - Prevent sensitive files from being committed

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push
   ```

2. **Import your project to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory

3. **Configure Environment Variables**:
   - In the project settings, go to "Environment Variables"
   - Add the following variable:
     - **Name**: `VITE_API_BASE_URL`
     - **Value**: Your backend API URL (e.g., `https://api.yourdomain.com`)
     - **Environment**: Production, Preview, Development (select all)

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

3. **Login to Vercel**:
   ```bash
   vercel login
   ```

4. **Deploy**:
   ```bash
   vercel
   ```

5. **Set environment variables**:
   ```bash
   vercel env add VITE_API_BASE_URL
   ```
   Then enter your backend API URL when prompted.

6. **Deploy to production**:
   ```bash
   vercel --prod
   ```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://api.yourdomain.com` |

### Local Development

For local development, copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

The default value is `http://localhost:3001` for local backend development.

## Routing Configuration

The `vercel.json` file includes:

- **Rewrites**: All routes are rewritten to `/index.html` to support client-side routing with React Router
- **Headers**: Static assets in `/assets/` are cached for 1 year for optimal performance

This ensures that:
- Direct URL access works (e.g., `yourdomain.com/simulador-hipoteca`)
- Page refreshes work correctly
- React Router handles all navigation

## Testing Your Deployment

After deployment, test the following:

1. ✅ Home page loads correctly
2. ✅ Navigation works (Inicio, Simulador, etc.)
3. ✅ Direct URL access works (try visiting `/simulador-hipoteca` directly)
4. ✅ Page refresh works on all routes
5. ✅ Forms submit correctly (check browser console for API errors)
6. ✅ Images load correctly
7. ✅ WhatsApp button works

## Troubleshooting

### Routes return 404
- Check that `vercel.json` is in the frontend root directory
- Verify the rewrites configuration is correct

### API calls fail
- Check that `VITE_API_BASE_URL` is set correctly in Vercel environment variables
- Verify your backend API is accessible and allows CORS from your Vercel domain
- Check browser console for detailed error messages

### Images not loading
- Ensure images are in `src/images/` directory
- Verify imports use the correct relative paths
- Check that images were included in the deployment

### Environment variables not working
- Environment variables in Vite must be prefixed with `VITE_`
- Redeploy after changing environment variables in Vercel dashboard
- Clear cache and hard reload your browser

## Custom Domain

To add a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your domain
4. Update your DNS settings as instructed by Vercel

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to your main branch
- Create preview deployments for pull requests
- Run the build process and deploy if successful

## Performance Optimization

The deployment is optimized with:
- Static asset caching (1 year for immutable files)
- Automatic CDN distribution
- Gzip/Brotli compression
- Image optimization (if using Vercel Image Optimization)

## Support

For issues with Vercel deployment:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

For issues with the application:
- Check browser console for errors
- Verify API endpoints are correct
- Ensure backend CORS settings allow your domain
