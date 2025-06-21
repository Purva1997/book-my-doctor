# Book My Doctor - Admin Dashboard

This is the admin dashboard for the Book My Doctor System. It provides interfaces for managing doctors, appointments, and viewing system analytics.

## Tech Stack

- React.js with Vite
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- React Toastify for notifications

## Prerequisites

- Node.js (v16 or higher)
- Backend server running (see backend README)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_ADMIN_URL=http://localhost:3001
```

## Installation

1. Clone the repository
2. Navigate to the admin directory:
   ```bash
   cd admin
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

The development server will start on port 3001.

## Features

- Admin authentication
- Doctor management
  - Add new doctors
  - View all doctors
  - Change doctor availability
- Appointment management
  - View all appointments
  - Cancel appointments
- Dashboard analytics
  - Total appointments
  - Total doctors
  - Revenue analytics
  - Recent activities

## Project Structure

```
admin/
├── public/          # Static files
├── src/
│   ├── assets/      # Images and other assets
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── context/     # React Context providers
│   │   ├── AdminContext.jsx
│   │   ├── AppContext.jsx
│   │   └── DoctorContext.jsx
│   ├── pages/      # Page components
│   │   └── Admin/
│   │       ├── AddDoctor.jsx
│   │       ├── AllAppointments.jsx
│   │       ├── Dashboard.jsx
│   │       └── DoctorsList.jsx
│   ├── App.jsx     # Main application component
│   └── main.jsx    # Application entry point
```

## Key Components

### Components
- `Navbar.jsx` - Top navigation bar
- `Sidebar.jsx` - Admin dashboard sidebar navigation

### Pages
- `Dashboard.jsx` - Main dashboard with analytics
- `AddDoctor.jsx` - Form to add new doctors
- `DoctorsList.jsx` - List and manage doctors
- `AllAppointments.jsx` - View and manage appointments

## Context API

The application uses React Context API for state management:
- `AdminContext.jsx` - Admin-specific state and functions
- `AppContext.jsx` - Global application state
- `DoctorContext.jsx` - Doctor-related state and functions

## Styling

- Uses TailwindCSS for responsive design
- Custom CSS for specific components
- Mobile-first approach
- Professional admin dashboard layout

## Error Handling

- Form validation
- API error handling
- User-friendly error messages
- Loading states for better UX

## Security

- JWT token-based authentication
- Protected routes for authenticated admins
- Role-based access control

## Development

- ESLint configuration for code quality
- Vite for fast development and building
- Hot Module Replacement (HMR)
- Environment variable management

## Build and Deployment

- Optimized production build
- Static file serving
- Environment-specific configurations
- Build size optimization
