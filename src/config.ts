const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://wishlist-production-ea96.up.railway.app' // Fixed: no trailing slash
  : 'http://localhost:3001'

export { API_BASE_URL }