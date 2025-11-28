# Vercel Deployment Setup

## Prerequisites
- A Vercel account (free tier works)
- This repository pushed to GitHub

## Steps to Deploy

### 1. Create a Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on the "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name (e.g., "wishlist-db")
6. Select a region close to you
7. Click "Create"

### 2. Connect Database to Your Project

1. Go to your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Vercel should automatically suggest connecting your Postgres database
4. Click "Connect" to add the database environment variables
5. The following variables will be automatically added:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### 3. Deploy

1. Push your code to GitHub (already done!)
2. Vercel will automatically redeploy
3. The database table will be created automatically on first request

### 4. Migrate Existing Data (Optional)

If you want to import your existing wishlist items from `db.json`, you can add them manually through the app's UI, or run this SQL in the Vercel Postgres query editor:

```sql
INSERT INTO wishlist_items (id, title, description, price, image_url, is_purchased, purchase_url)
VALUES
  ('1754194162108', 'Canon Powershot S200', 'camera go brrrr', 80, 'https://m.media-amazon.com/images/I/81-waw-cV8L._AC_SX679_.jpg', false, 'https://www.amazon.com/Canon-PowerShot-Digital-Camera-Optical/dp/B0000645C9'),
  ('1754194446574', 'airpods', 'my old ones broke :(', 120, 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/ed0cfc76-5b94-4e84-af82-a3cc7cff60e4.jpg;maxHeight=1920;maxWidth=900?format=webp', false, 'https://www.bestbuy.com/site/apple-airpods-4-white/6447384.p?skuId=6447384'),
  ('1754194550882', 'Sony - WH1000XM4 Wireless Noise-Cancelling Over-the-Ear Headphones - Silver', 'I WANT BIG HEADPHONE', 199.99, 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6408/6408357_rd.jpg;maxHeight=1920;maxWidth=900?format=webp', false, 'https://www.bestbuy.com/site/sony-wh1000xm4-wireless-noise-cancelling-over-the-ear-headphones-silver/6408357.p?skuId=6408357');
```

## That's it!

Your wishlist app should now be fully functional on Vercel with persistent database storage!

## Cost

- Vercel Hosting: **Free** (Hobby plan)
- Vercel Postgres: **Free** tier includes:
  - 256 MB storage
  - 60 hours of compute per month
  - Perfect for a personal wishlist app!
