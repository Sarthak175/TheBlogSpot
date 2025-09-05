# Deployment Guide

## GitHub Setup

1. **Initialize Git Repository:**
```bash
git init
git add .
git commit -m "Initial commit: The Blog Spot"
```

2. **Connect to GitHub:**
```bash
git remote add origin https://github.com/Sarthak175/TheBlogSpot.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

### Method 1: Vercel CLI (Recommended)
1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

### Method 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `Sarthak175/TheBlogSpot`
4. Configure:
   - Framework Preset: **Create React App**
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Add Environment Variables (if using Firebase)
6. Click "Deploy"

## Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Local Development

1. **Clone Repository:**
```bash
git clone https://github.com/Sarthak175/TheBlogSpot.git
cd TheBlogSpot
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Set Environment Variables:**
```bash
cp .env.example .env
# Edit .env with your Firebase config
```

4. **Start Development Server:**
```bash
npm start
```

## Build for Production

```bash
npm run build
```

The build folder will contain the optimized production files.

## Troubleshooting

- **Build Errors:** Check console for missing dependencies
- **Routing Issues:** Ensure vercel.json is configured for SPA
- **Firebase Errors:** Verify environment variables are set correctly
- **404 Errors:** Check that all routes are properly configured

## Features Included

✅ Responsive Design
✅ Dark/Light Theme
✅ Post Management (CRUD)
✅ Comment System
✅ Search Functionality
✅ Categories & Tags
✅ Dashboard Analytics
✅ Theme Customization
✅ Layout Management
✅ Reading List
✅ Static Pages (About, Contact, Privacy, Disclaimer)

## Tech Stack

- **Frontend:** React 18, React Router
- **Backend:** Firebase (Firestore, Auth)
- **Styling:** CSS3, Custom Themes
- **Deployment:** Vercel
- **Version Control:** Git, GitHub