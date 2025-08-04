const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.railway.app' // Replace this after deploying backend
  : 'http://localhost:3001'

export { API_BASE_URL }