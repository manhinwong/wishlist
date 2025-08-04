# Birthday Wishlist App

A modern, minimalist birthday wishlist web application built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ Modern minimalist design with cool tone colors (blues, teals, soft grays)
- 📱 Mobile-first responsive design that works on all devices
- 🔍 Search functionality to filter through wishlist items
- ➕ Add new wishlist items with floating action button
- ✅ Mark items as purchased with visual state changes
- 🗑️ Remove items from wishlist
- 🔗 Share wishlist via generated link
- 🛒 Direct links to purchase items (Amazon integration ready)

## Sample Data

The app comes pre-loaded with sample wishlist items:
- Sony WH-1000XM4 Wireless Headphones
- The Design of Everyday Things - Coffee Table Book  
- The Ordinary Skincare Set
- Ticket to Ride Board Game

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd wishlist-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

#### With Backend (Optional)

For a full-featured experience with persistent data, you can run the JSON server backend:

1. In one terminal, start the backend:
   ```bash
   npm run server
   ```
   This starts the JSON server at `http://localhost:3001`

2. In another terminal, start the frontend:
   ```bash
   npm run dev
   ```

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx          # Main application component
├── index.css        # Tailwind CSS imports and custom styles
├── main.tsx         # Application entry point
└── vite-env.d.ts    # Vite type definitions

public/              # Static assets
db.json             # Mock database for JSON server
tailwind.config.js  # Tailwind CSS configuration
```

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Backend (Optional)**: JSON Server for mock API
- **Icons**: Heroicons (inline SVG)

## Features in Detail

### Card-Based Layout
- Pinterest-style card layout for wishlist items
- Each card displays: image, title, description, price, and purchase status
- Hover effects and smooth transitions

### Search & Filter
- Real-time search functionality
- Searches through item titles and descriptions
- Clean, responsive search bar in header

### Interactive Features
- Floating action button for adding new items
- Modal form for item creation
- Toggle purchase status with visual feedback
- Delete items with confirmation
- Share wishlist functionality (native Web Share API + clipboard fallback)

### Responsive Design
- Mobile-first approach
- Responsive grid layout (1-4 columns based on screen size)
- Touch-friendly button sizes
- Optimized for all device sizes

## Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- Primary: Blue tones (#0ea5e9 family)
- Secondary: Teal tones (#14b8a6 family)
- Neutral: Gray tones for text and borders

### Adding New Features
The codebase is structured for easy extension:
- Add new fields to the `WishlistItem` interface
- Extend the modal form for additional inputs
- Add new filtering options beyond search
- Integrate with real APIs (Amazon, etc.)

## Browser Support

- Modern browsers with ES6+ support
- Progressive Web App features (Web Share API)
- Graceful fallbacks for older browsers

## License

This project is open source and available under the MIT License.
