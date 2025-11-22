# GitHub Pages Deployment Guide

## 🎯 Overview

This guide will help you deploy your Next.js portfolio to GitHub Pages at: `https://vrdevil44.github.io/TheNexus/`

## 📋 Prerequisites

- GitHub repository: `https://github.com/Vrdevil44/TheNexus`
- GitHub Personal Access Token (you'll provide this manually)

## 🚀 Deployment Steps

### Step 1: Configure GitHub Pages Settings

1. Go to your repository on GitHub: `https://github.com/Vrdevil44/TheNexus`
2. Click on **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - Source: **GitHub Actions** (NOT "Deploy from a branch")
5. Save the settings

### Step 2: Push the Workflow File

The GitHub Actions workflow has been created at `.github/workflows/deploy.yml`. You need to commit and push it:

```bash
# Add the workflow file
git add .github/workflows/deploy.yml

# Commit the changes
git commit -m "Add GitHub Pages deployment workflow"

# Push to GitHub (you'll need to provide your PAT when prompted)
git push origin main
```

### Step 3: Monitor the Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow run starting automatically
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your site will be live at: `https://vrdevil44.github.io/TheNexus/`

## 🔧 Manual Build & Deploy (Alternative Method)

If you prefer to deploy manually without GitHub Actions:

### Option A: Using gh-pages branch

```bash
# Install gh-pages package
pnpm add -D gh-pages

# Add deploy script to package.json (already configured)
# Then run:
pnpm build
pnpm deploy
```

### Option B: Manual Upload

```bash
# Build the project
pnpm build

# The output will be in the 'out' directory
# Manually upload the contents of 'out' to the gh-pages branch
```

## 🐛 Troubleshooting

### Issue: 404 Error on GitHub Pages

**Causes:**
1. GitHub Pages source not set to "GitHub Actions"
2. Missing `.nojekyll` file (the workflow adds this automatically)
3. Incorrect basePath in `next.config.ts`

**Solutions:**
- Ensure GitHub Pages source is set to **GitHub Actions** (not "Deploy from a branch")
- The workflow automatically creates `.nojekyll` in the `out` directory
- Verify `basePath: "/TheNexus"` matches your repository name

### Issue: Assets Not Loading (404 for CSS/JS)

**Cause:** Incorrect asset paths

**Solution:**
- Ensure `basePath` in `next.config.ts` matches your repo name exactly
- Current setting: `basePath: isProd ? "/TheNexus" : ""`

### Issue: Workflow Fails

**Common causes:**
1. GitHub Pages not enabled in repository settings
2. Insufficient permissions
3. Build errors

**Solutions:**
- Check the Actions tab for detailed error logs
- Ensure all dependencies are in `package.json`
- Test the build locally first: `pnpm build`

## 📝 Configuration Files

### next.config.ts
```typescript
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/TheNexus" : "",
  images: {
    unoptimized: true,
  },
};
```

### package.json (deploy script)
```json
{
  "scripts": {
    "deploy": "gh-pages -d out -t true"
  }
}
```

## ✅ Verification Checklist

- [ ] GitHub Pages source set to "GitHub Actions"
- [ ] Workflow file pushed to repository
- [ ] Workflow completed successfully in Actions tab
- [ ] Site accessible at `https://vrdevil44.github.io/TheNexus/`
- [ ] All assets loading correctly (no 404s in browser console)
- [ ] Navigation working properly

## 🔄 Automatic Deployments

Once set up, every push to the `main` branch will automatically:
1. Build your Next.js app
2. Add `.nojekyll` file
3. Deploy to GitHub Pages

No manual intervention needed!

## 📞 Need Help?

If you encounter issues:
1. Check the Actions tab for build logs
2. Verify GitHub Pages settings
3. Test local build: `pnpm build && pnpm start`
4. Check browser console for errors

---

**Your site will be live at:** `https://vrdevil44.github.io/TheNexus/`
