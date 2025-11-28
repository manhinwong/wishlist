const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api' // Vercel serverless functions
  : 'http://localhost:3001'

export { API_BASE_URL }