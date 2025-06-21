# Book My Doctor - Patient Portal

This is the patient portal frontend for the Book My Doctor System. It allows patients to book appointments, view their medical history, and manage their profile.

## Tech Stack

- React.js (Create React App)
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- React Toastify for notifications
- Razorpay integration for payments

## Prerequisites

- Node.js (v16 or higher)
- Backend server running (see backend README)
- Razorpay account for payments

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_ADMIN_URL=http://localhost:3001
```

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Development mode:
```bash
npm start
```

Build for production:
```bash
npm run build
```

The development server will start on port 3000.

## Features

- User authentication (login/register)
- Browse doctors by speciality
- View doctor profiles and availability
- Book appointments
- Make payments through Razorpay
- View appointment history
- Cancel appointments
- Update profile

## Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # Reusable components
│   ├── context/     # React Context providers
│   ├── pages/       # Page components
│   ├── App.js       # Main application component
│   └── index.js     # Application entry point
```

## Key Components

### Components
- `Banner.js` - Homepage banner component
- `Footer.js` - Application footer
- `Header.js` - Application header
- `NavBar.js` - Navigation bar
- `RelatedDoctors.js` - Shows related doctors
- `SpecialityMenu.js` - Doctor speciality selection
- `TopDoctors.js` - Displays top-rated doctors

### Pages
- `Home.js` - Landing page
- `About.js` - About page
- `Doctors.js` - Doctors listing
- `Appointment.js` - Appointment booking
- `MyAppointments.js` - User's appointments
- `MyProfile.js` - User profile management
- `Login.js` - Authentication page

## Context API

The application uses React Context API for state management:
- `AppContext.js` - Manages global application state
- User authentication state
- Appointment data
- Profile information

## Styling

- Uses TailwindCSS for responsive design
- Custom CSS for specific components
- Mobile-first approach

## Error Handling

- Form validation
- API error handling
- User-friendly error messages
- Loading states for better UX

## Security

- JWT token-based authentication
- Secure storage of sensitive information
- Protected routes for authenticated users

## Payment Integration

- Razorpay payment gateway integration
- Secure payment processing
- Payment status tracking
- Payment history
