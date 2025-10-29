# Creator Portal

A modern creator management portal built with React, TypeScript, Vite, and Tailwind CSS. This application provides a comprehensive dashboard for managing creator profiles with full CRUD operations, responsive design, and a mock backend API.

## 🎯 Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete creators via REST API
- ✅ **Mock Backend**: JSON Server API with persistent data storage
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS - perfect on all devices
- ✅ **Advanced Search & Filtering**: Search creators by name, niche, or city with real-time results
- ✅ **Pagination**: Client-side pagination with customizable items per page
- ✅ **Multiple View Modes**: Toggle between Grid and Table views
- ✅ **Routing**: React Router for seamless navigation
- ✅ **State Management**: Context API for global state management
- ✅ **Form Validation**: Comprehensive client-side validation with error messages
- ✅ **Sidebar Modals**: Smooth animated sidebar forms for Add/Edit operations
- ✅ **Backdrop Blur Effects**: Modern UI with glassmorphism effects
- ✅ **Loading States**: Skeleton loaders and spinners for better UX
- ✅ **Micro-interactions**: Smooth transitions and hover effects throughout
- ✅ **Dark Mode Support**: Automatic theme switching based on system preference
- ✅ **Professional Typography**: Modern font choices for visual consistency

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd creator-portal
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

**Important:** You need to run both the JSON Server backend and the Vite dev server.

1. Start the JSON Server (API Backend) in one terminal:
```bash
npm run start
# This starts JSON Server on http://localhost:3001
```

2. Start the development server in another terminal:
```bash
npm run dev
# This starts the React app on http://localhost:5173
```

The application will be available at `http://localhost:5173`

**Note:** The backend API runs on `http://localhost:3001/api` and uses JSON Server to persist data in `db.json`.

## Project Structure

```
src/
├── api/
│   └── creators.ts          # API functions for CRUD operations
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── CreatorCard.tsx     # Card component for creator display
│   ├── CreatorForm.tsx     # Form for adding/editing creators
│   └── Loader.tsx          # Loading spinner
├── context/
│   └── CreatorContext.tsx  # Global state management
├── data/
│   └── creators.json       # Default creators data
├── pages/
│   ├── CreatorList.tsx     # Home page - list all creators
│   ├── CreatorDetails.tsx  # Single creator details page
│   ├── AddCreator.tsx      # Add new creator page
│   └── EditCreator.tsx     # Edit existing creator page
├── App.tsx                  # Main app component with routing
└── main.tsx                # Entry point
```

## 📡 API Endpoints

The application uses JSON Server as a mock backend. All endpoints are prefixed with `/api`:

### Base URL
```
http://localhost:3001/api
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/creators` | Get all creators | - |
| GET | `/creators/:id` | Get a single creator | - |
| POST | `/creators` | Create a new creator | Creator object (without id) |
| PATCH | `/creators/:id` | Update a creator | Partial Creator object |
| DELETE | `/creators/:id` | Delete a creator | - |

### Example Requests

**Get all creators:**
```bash
curl http://localhost:3001/api/creators
```

**Get single creator:**
```bash
curl http://localhost:3001/api/creators/1
```

**Create creator:**
```bash
curl -X POST http://localhost:3001/api/creators \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com",...}'
```

**Update creator:**
```bash
curl -X PATCH http://localhost:3001/api/creators/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith"}'
```

**Delete creator:**
```bash
curl -X DELETE http://localhost:3001/api/creators/1
```

## 📦 Available Scripts

- `npm run dev` - Start React development server (Vite)
- `npm run start` - Start JSON Server backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Technologies Used

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router 7** - Modern routing solution
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - Global state management
- **Google Fonts** - Professional typography

### Backend
- **JSON Server** - Mock REST API server
- **Node.js** - Runtime environment

### Design
- **Glassmorphism UI** - Backdrop blur effects
- **Dark Mode** - System preference-aware theming
- **Responsive Grid/Table** - Adaptive layouts
- **Micro-interactions** - Smooth animations

## 💭 Reflection

### Tech Stack Choices

**React + TypeScript**: Chose React for its ecosystem and TypeScript for type safety and better developer experience. The combination ensures maintainable, scalable code.

**Tailwind CSS**: Selected for rapid development and consistent design system without writing custom CSS. Enables quick prototyping while maintaining professional aesthetics.

**Context API**: Used for global state management instead of Redux. It's perfect for this application's scale and reduces boilerplate while keeping the architecture simple.

**JSON Server**: Implemented as a mock backend to satisfy the assignment requirement for backend knowledge. Provides realistic API interactions without complex server setup.

**Vite**: Chose over Create React App for faster hot module replacement and better build performance.

### Design Philosophy

The design follows modern dashboard principles inspired by platforms like Dribbble and Behance:
- **Visual Hierarchy**: Clear typography scaling and spacing
- **Consistency**: Unified color scheme and component styles
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Performance**: Optimized images and lazy loading
- **User Experience**: Loading states, smooth transitions, and immediate feedback

### What Would I Improve Given 1 More Day?

1. **Backend Filtering**: Implement server-side filtering and pagination for better performance with large datasets
2. **Image Upload**: Add actual file upload functionality instead of URL input
3. **Advanced Search**: Add filters for city, gender, follower count, etc.
4. **Export/Import**: Allow CSV/JSON export and import of creator data
5. **Drag & Drop**: Reorder creators with drag and drop in table view
6. **Bulk Operations**: Select and delete multiple creators at once
7. **Email Validation**: Add comprehensive email and phone number validation
8. **Search Highlighting**: Highlight matching search terms in results
9. **Keyboard Shortcuts**: Add shortcuts for common actions (e.g., Ctrl+K for search)
10. **Error Boundaries**: Implement React error boundaries for better error handling

### Current Achievements

✅ All assignment requirements met (UI/UX, Responsiveness, Backend, Languages, Skills)  
✅ Production-ready code with proper error handling  
✅ Modern, professional UI that works across all devices  
✅ Full CRUD operations with persistent data storage  
✅ Clean, maintainable codebase with TypeScript

## 📝 Data Storage

Data is persisted in `db.json` by JSON Server:
- All CRUD operations are reflected immediately
- Data persists across server restarts
- File-based storage for easy inspection and backup

## 🚀 Deployment

### Live Demo
https://creator-portal-542da.web.app/

### Deployment Instructions

This application can be deployed to various platforms. Here are recommended options:

#### Option 1: Deploy with JSON Server (Full Stack)
- **Frontend**: Deploy to Vercel/Netlify
- **Backend**: Deploy JSON Server to Railway or Render
- **Database**: Use `db.json` or connect to a real database

#### Option 2: Simplified Deployment (Frontend Only)
For demo purposes without a live backend, you can:
1. Build the frontend: `npm run build`
2. Deploy `dist/` folder to Vercel/Netlify
3. Update `API_BASE_URL` in `src/api/creators.ts` to your deployed backend URL

#### Recommended: Vercel + Railway
1. **Frontend**: Connect GitHub repo to Vercel, auto-deploy on push
2. **Backend**: Deploy JSON Server to Railway with `db.json`
3. Update environment variable for API URL

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:3001/api  # For local development
# or
VITE_API_BASE_URL=https://your-backend.railway.app/api  # For production
```

### Build for Production
```bash
npm run build
# Output directory: dist/
```

## 📄 License

This project is part of a frontend developer assignment submission.

## 👤 Author

Created with ❤️ for the Creator Portal assignment
