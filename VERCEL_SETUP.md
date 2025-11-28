# Vercel Deployment Setup

## Quick Setup (5 minutes!)

Your wishlist app is ready to deploy on Vercel's free tier. Follow these simple steps:

### 1. Create a Vercel KV Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on the **"Storage"** tab
3. Click **"Create Database"**
4. Select **"KV"** (Redis-based key-value store)
5. Give it a name like "wishlist-kv"
6. Select a region close to you
7. Click **"Create"**

### 2. Connect to Your Project

1. After creating the database, click on it
2. Go to the **"Connect"** tab or click **"Connect Project"**
3. Select your wishlist project from the dropdown
4. Click **"Connect"**
5. This automatically adds the required environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`

### 3. Deploy!

That's it! Vercel will automatically redeploy your app with the new database connection.

Your wishlist will start with the default items and persist all changes.

## What You Get (All FREE!)

- ✅ **Vercel Hosting** - Free frontend hosting
- ✅ **Vercel KV** - Free Redis database (256MB storage)
- ✅ **Serverless API** - No backend server needed
- ✅ **No CORS errors** - Everything on same domain
- ✅ **Persistent storage** - Your data is saved permanently
- ✅ **Auto-scaling** - Handles traffic automatically

## Free Tier Limits

Vercel KV Free Tier includes:
- 256 MB storage
- 10,000 commands per day
- 1 GB bandwidth per month

This is more than enough for a personal wishlist app!

## Local Development

For local development, the app uses json-server on port 3001:

```bash
# Terminal 1: Start the backend
npm run server

# Terminal 2: Start the frontend
npm run dev
```

Visit `http://localhost:5173` to see your app locally.

## Troubleshooting

**If you see errors on Vercel:**
1. Make sure you've created and connected the KV database
2. Check that environment variables are set in your Vercel project settings
3. Try redeploying from the Vercel dashboard

**Common issues:**
- **"405 Method Not Allowed"** - KV database not connected yet
- **"500 Internal Server Error"** - Check environment variables in Vercel dashboard
