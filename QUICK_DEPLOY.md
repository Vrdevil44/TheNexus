# 🚀 Quick Deployment Steps

## ⚡ FASTEST METHOD: GitHub Actions (Recommended)

### Step 1: Enable GitHub Pages
1. Go to: https://github.com/Vrdevil44/TheNexus/settings/pages
2. Under **"Build and deployment"** → **"Source"**
3. Select: **GitHub Actions** (NOT "Deploy from a branch")
4. Click Save

### Step 2: Push the Workflow
```bash
# Add all changes
git add .

# Commit
git commit -m "Add GitHub Pages deployment workflow"

# Push (you'll paste your PAT when prompted for password)
git push origin main
```

### Step 3: Wait & Visit
1. Go to: https://github.com/Vrdevil44/TheNexus/actions
2. Wait for the workflow to complete (~2-3 minutes)
3. Visit: **https://vrdevil44.github.io/TheNexus/**

---

## 🔄 ALTERNATIVE: Manual Deployment

If GitHub Actions doesn't work, use this manual method:

```bash
# Install gh-pages
pnpm install

# Deploy (this builds and pushes to gh-pages branch)
pnpm deploy
```

Then set GitHub Pages source to:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **root**

---

## ✅ What Was Fixed

1. ✅ Created `.github/workflows/deploy.yml` - Automated deployment
2. ✅ Added `.nojekyll` creation step - Fixes `_next` folder 404 errors
3. ✅ Added `pnpm deploy` script - Manual deployment option
4. ✅ Your `basePath: "/TheNexus"` is already correct

---

## 🐛 If You Get 404 Error

### Check 1: GitHub Pages Source
- Must be set to **"GitHub Actions"** (preferred)
- OR **"gh-pages branch"** if using manual method

### Check 2: Workflow Completed
- Check Actions tab: https://github.com/Vrdevil44/TheNexus/actions
- Ensure workflow shows green checkmark

### Check 3: Wait Time
- First deployment can take 5-10 minutes
- Subsequent deployments: 2-3 minutes

---

## 📝 When Pushing to GitHub

**IMPORTANT:** When git asks for password, paste your Personal Access Token (PAT), NOT your GitHub password!

```
Username: Vrdevil44
Password: [PASTE YOUR PAT HERE]
```

---

## 🎯 Your Live URL

After deployment completes:
**https://vrdevil44.github.io/TheNexus/**

---

## 🆘 Need Help?

1. Check Actions tab for errors
2. Verify Pages settings
3. Clear browser cache and try again
4. Check browser console (F12) for specific 404 errors
