# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a MERN stack hackathon project called "EcoFind" - an eco-friendly platform for item repair and sharing. The application allows users to:
- Post items for repair or offer items for free
- Connect regular users with repairers
- Track eco points for sustainable actions
- Comment on items and manage user profiles

## Architecture

### Backend (`/backend`)
- **Framework**: Express.js with ES modules
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcryptjs for password hashing
- **File Uploads**: Multer middleware for image handling
- **Key Models**:
  - `User`: Supports regular users and repairers, tracks eco points
  - `Item`: Handles repair requests and free offers with status tracking
  - `Comment`: Nested comments on items

### Frontend (`/frontend`)
- **Framework**: React 18+ with Vite
- **Styling**: TailwindCSS with PostCSS
- **State Management**: Redux Toolkit with separate auth and item slices
- **Routing**: React Router Dom v7
- **HTTP Client**: Axios with interceptors for token management

### Key Architectural Patterns
- **Authentication Flow**: JWT stored in localStorage, axios interceptors add Bearer tokens
- **State Management**: Dual Redux stores (legacy `redux/` and newer `store/` directories)
- **Protected Routes**: ProtectedRoute component wraps authenticated pages
- **File Structure**: Feature-based organization with separate components, pages, and API logic

## Development Commands

### Backend Development
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Frontend Development
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (usually runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Full Stack Development
```bash
# Start both servers simultaneously (run in separate terminals)
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

## Environment Setup

### Backend Environment Variables (`.env`)
Required variables in `backend/.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecofind
PORT=5000
JWT_SECRET=your-jwt-secret-key
```

### Database Connection
- MongoDB Atlas connection string is configured for the "ecofind" database
- Models use Mongoose schemas with timestamps
- Authentication middleware protects routes using JWT verification

## Important Development Notes

### Current State Issues
⚠️ **MERGE CONFLICT**: The codebase contains unresolved merge conflicts in:
- `backend/server.js` (lines 6-54)
- `frontend/src/App.jsx` (lines 1-84)
- `backend/models/Item.js` (lines 3-25)

**Resolve these conflicts before making changes**

### Dual State Management
The frontend has two Redux configurations:
- `/src/redux/` - Simpler auth-only store
- `/src/store/` - More complete store with token persistence
Choose one approach and consolidate for consistency.

### API Integration
- Backend API base URL: `http://localhost:5000/api`
- Frontend uses axios instance with automatic Bearer token injection
- All protected routes require valid JWT token

### File Upload Handling
- Backend serves uploaded files via `/uploads` static route
- Multer middleware configured for image uploads
- Frontend should handle multipart form data for images

### User Types and Permissions
- Users can be "regular" or "repairer" type
- Items support two modes: "repair-request" and "offer-free"
- Eco points system tracks sustainable actions

## Testing Strategy
No test framework is currently configured. Recommended additions:
- Backend: Jest/Mocha for API testing
- Frontend: Vitest (since using Vite) or React Testing Library
- E2E: Playwright or Cypress

## Deployment Considerations
- Frontend build output goes to `frontend/dist/`
- Backend serves static files from `uploads/` directory
- MongoDB connection requires network access configuration
- JWT_SECRET must be secure in production environment

<citations>
<document>
<document_type>WARP_DOCUMENTATION</document_type>
<document_id>getting-started/quickstart-guide/coding-in-warp</document_id>
</document>
</citations>
