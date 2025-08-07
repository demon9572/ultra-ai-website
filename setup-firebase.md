# Firebase Hosting Setup Guide

## Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase
```bash
firebase login
```
This will open your browser for Google authentication.

## Step 3: Initialize Firebase Project
```bash
firebase init hosting
```
- Select "Use an existing project" or "Create a new project"
- Choose your project ID: `ultra-ai-assistant-2024`
- Set public directory to: `.` (current directory)
- Configure as single-page app: `Yes`
- Set up automatic builds: `No`

## Step 4: Deploy
```bash
firebase deploy
```

## Your website will be available at:
`https://ultra-ai-assistant-2024.web.app`
or
`https://ultra-ai-assistant-2024.firebaseapp.com`

## Files Created:
- `firebase.json` - Hosting configuration
- `.firebaserc` - Project configuration
- `deploy.bat` - Windows deployment script

## Manual Steps Required:
1. Go to https://console.firebase.google.com
2. Create a new project with ID: "ultra-ai-assistant-2024"
3. Enable Hosting in the Firebase console
4. Run the commands above in your terminal