import fs from 'fs'
import path from 'path'

// Path to the db.json file
const dbPath = path.join(process.cwd(), 'db.json')

// Helper to read the database
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return { wishlistItems: [] }
  }
}

// Helper to write to the database
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const db = readDB()
  const { id } = req.query

  try {
    switch (req.method) {
      case 'GET':
        // Get all items or a specific item
        if (id) {
          const item = db.wishlistItems.find(item => item.id === id)
          if (!item) {
            return res.status(404).json({ error: 'Item not found' })
          }
          return res.status(200).json(item)
        }
        return res.status(200).json(db.wishlistItems)

      case 'POST':
        // Create a new item
        const newItem = req.body
        db.wishlistItems.push(newItem)
        writeDB(db)
        return res.status(201).json(newItem)

      case 'PUT':
        // Update an existing item
        if (!id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const itemIndex = db.wishlistItems.findIndex(item => item.id === id)
        if (itemIndex === -1) {
          return res.status(404).json({ error: 'Item not found' })
        }
        db.wishlistItems[itemIndex] = req.body
        writeDB(db)
        return res.status(200).json(req.body)

      case 'DELETE':
        // Delete an item
        if (!id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const deleteIndex = db.wishlistItems.findIndex(item => item.id === id)
        if (deleteIndex === -1) {
          return res.status(404).json({ error: 'Item not found' })
        }
        db.wishlistItems.splice(deleteIndex, 1)
        writeDB(db)
        return res.status(204).end()

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
