# Book My Doctor - Backend

This is the backend server for the Book My Doctor System. It provides APIs for both the patient portal (frontend) and admin dashboard.

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Cloudinary for image storage
- Razorpay for payments

## Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running
- Cloudinary account
- Razorpay account (for payments)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

Development mode (with auto-reload):
```bash
npm start
```

Production mode:
```bash
npm run server
```

The server will start on port 4000 (or the port specified in your .env file).

## API Endpoints

### Admin Routes (`/api/admin`)
- POST `/add-doctor` - Add a new doctor
- POST `/all-doctors` - Get all doctors
- POST `/change-availability` - Change doctor availability
- GET `/appointments` - Get all appointments
- POST `/cancel-appointment` - Cancel an appointment
- GET `/dashboard` - Get admin dashboard data

### Doctor Routes (`/api/doctor`)
- POST `/appointments` - Get doctor's appointments
- POST `/profile` - Update doctor profile
- GET `/dashboard` - Get doctor dashboard data

### User Routes (`/api/user`)
- POST `/register` - Register new user
- POST `/login` - User login
- POST `/book-appointment` - Book an appointment
- GET `/appointments` - Get user's appointments
- POST `/cancel-appointment` - Cancel appointment

## Project Structure

```
backend/
├── config/           # Database and third-party service configurations
├── controllers/      # Route controllers
├── middlewares/     # Custom middleware functions
├── models/          # Database models
├── routes/          # API routes
└── server.js        # Main application file
```

## Error Handling

The application uses a centralized error handling mechanism. All errors are logged and appropriate error responses are sent to the client.

## Authentication

- JWT-based authentication
- Separate middleware for admin, doctor, and user authentication
- Token expiration and refresh mechanism

## File Upload

- Uses Multer for handling multipart/form-data
- Cloudinary integration for image storage
- Supports image upload for doctor profiles 