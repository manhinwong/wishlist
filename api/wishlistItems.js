import { sql } from '@vercel/postgres'

// Initialize the database table if it doesn't exist
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS wishlist_items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT,
        is_purchased BOOLEAN DEFAULT FALSE,
        purchase_url TEXT
      )
    `
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Initialize database
  await initDB()

  const { id } = req.query

  try {
    switch (req.method) {
      case 'GET':
        if (id) {
          // Get a specific item
          const { rows } = await sql`
            SELECT id, title, description, price,
                   image_url as "imageUrl",
                   is_purchased as "isPurchased",
                   purchase_url as "purchaseUrl"
            FROM wishlist_items
            WHERE id = ${id}
          `
          if (rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' })
          }
          return res.status(200).json(rows[0])
        } else {
          // Get all items
          const { rows } = await sql`
            SELECT id, title, description, price,
                   image_url as "imageUrl",
                   is_purchased as "isPurchased",
                   purchase_url as "purchaseUrl"
            FROM wishlist_items
            ORDER BY id DESC
          `
          return res.status(200).json(rows)
        }

      case 'POST':
        // Create a new item
        const newItem = req.body
        await sql`
          INSERT INTO wishlist_items (id, title, description, price, image_url, is_purchased, purchase_url)
          VALUES (${newItem.id}, ${newItem.title}, ${newItem.description},
                  ${newItem.price}, ${newItem.imageUrl}, ${newItem.isPurchased || false},
                  ${newItem.purchaseUrl || null})
        `
        return res.status(201).json(newItem)

      case 'PUT':
        // Update an existing item
        if (!id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const updatedItem = req.body
        await sql`
          UPDATE wishlist_items
          SET title = ${updatedItem.title},
              description = ${updatedItem.description},
              price = ${updatedItem.price},
              image_url = ${updatedItem.imageUrl},
              is_purchased = ${updatedItem.isPurchased},
              purchase_url = ${updatedItem.purchaseUrl || null}
          WHERE id = ${id}
        `
        return res.status(200).json(updatedItem)

      case 'DELETE':
        // Delete an item
        if (!id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        await sql`DELETE FROM wishlist_items WHERE id = ${id}`
        return res.status(204).end()

      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}
