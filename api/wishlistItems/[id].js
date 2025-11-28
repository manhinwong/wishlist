import { kv } from '@vercel/kv'

const WISHLIST_KEY = 'wishlistItems'

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

    if (!items) {
      items = []
    }

    switch (req.method) {
      case 'GET':
        // Get a specific item
        const item = items.find(item => item.id === id)
        if (!item) {
          return res.status(404).json({ error: 'Item not found' })
        }
        return res.status(200).json(item)

      case 'PUT':
        // Update an existing item
        const itemIndex = items.findIndex(item => item.id === id)
        if (itemIndex === -1) {
          return res.status(404).json({ error: 'Item not found' })
        }
        items[itemIndex] = req.body
        await kv.set(WISHLIST_KEY, items)
        return res.status(200).json(req.body)

      case 'DELETE':
        // Delete an item
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
      details: error.message
    })
  }
}
