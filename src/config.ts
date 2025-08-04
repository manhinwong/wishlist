const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://wishlist-production-ea96.up.railway.app' // Remove trailing slash
  : 'http://localhost:3001'

export { API_BASE_URL }