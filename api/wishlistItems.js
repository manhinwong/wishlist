import { kv } from '@vercel/kv'

const WISHLIST_KEY = 'wishlistItems'

// Default wishlist items
const DEFAULT_ITEMS = [
  {
    "id": "1754194162108",
    "title": "Canon Powershot S200",
    "description": "camera go brrrr",
    "price": 80,
    "imageUrl": "https://m.media-amazon.com/images/I/81-waw-cV8L._AC_SX679_.jpg",
    "isPurchased": false,
    "purchaseUrl": "https://www.amazon.com/Canon-PowerShot-Digital-Camera-Optical/dp/B0000645C9"
  },
  {
    "id": "1754194446574",
    "title": "airpods",
    "description": "my old ones broke :(",
    "price": 120,
    "imageUrl": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/ed0cfc76-5b94-4e84-af82-a3cc7cff60e4.jpg;maxHeight=1920;maxWidth=900?format=webp",
    "isPurchased": false,
    "purchaseUrl": "https://www.bestbuy.com/site/apple-airpods-4-white/6447384.p?skuId=6447384"
  },
  {
    "id": "1754194550882",
    "title": "Sony - WH1000XM4 Wireless Noise-Cancelling Over-the-Ear Headphones - Silver",
    "description": "I WANT BIG HEADPHONE",
    "price": 199.99,
    "imageUrl": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6408/6408357_rd.jpg;maxHeight=1920;maxWidth=900?format=webp",
    "isPurchased": false,
    "purchaseUrl": "https://www.bestbuy.com/site/sony-wh1000xm4-wireless-noise-cancelling-over-the-ear-headphones-silver/6408357.p?skuId=6408357"
  }
]

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { id } = req.query

  try {
    // Get all items from KV store
    let items = await kv.get(WISHLIST_KEY)

    // Initialize with default items if none exist
    if (!items) {
      items = DEFAULT_ITEMS
      await kv.set(WISHLIST_KEY, items)
    }

    switch (req.method) {
      case 'GET':
        if (id) {
          // Get a specific item
          const item = items.find(item => item.id === id)
          if (!item) {
            return res.status(404).json({ error: 'Item not found' })
          }
          return res.status(200).json(item)
        }
        // Get all items
        return res.status(200).json(items)

      case 'POST':
        // Create a new item
        const newItem = req.body
        items.push(newItem)
        await kv.set(WISHLIST_KEY, items)
        return res.status(201).json(newItem)

      case 'PUT':
        // Update an existing item
        if (!id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const itemIndex = items.findIndex(item => item.id === id)
        if (itemIndex === -1) {
          return res.status(404).json({ error: 'Item not found' })
        }
        items[itemIndex] = req.body
        await kv.set(WISHLIST_KEY, items)
        return res.status(200).json(req.body)

      case 'DELETE':
        // Delete an item
        if (!id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const deleteIndex = items.findIndex(item => item.id === id)
        if (deleteIndex === -1) {
          return res.status(404).json({ error: 'Item not found' })
        }
        items.splice(deleteIndex, 1)
        await kv.set(WISHLIST_KEY, items)
        return res.status(204).end()

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
      hint: 'Make sure to set up Vercel KV storage in your Vercel dashboard'
    })
  }
}
