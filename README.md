# Book My Doctor

A comprehensive healthcare appointment management system built with the MERN stack.

## Project Structure

This is a monorepo containing three main modules: 

- `admin/` - Admin dashboard for managing doctors and appointments
- `frontend/` - Patient-facing web application
- `backend/` - Node.js/Express API server

## Getting Started

### Prerequisites

- Node.js >= 16
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Purva1997/book-my-doctor.git
cd book-my-doctor
```

2. Install dependencies for all modules:
```bash
npm run install:all
```

3. Create `.env` files in each module directory based on the provided `.env.example` files.

### Development

To run all modules in development mode:
```bash
npm run dev
```

To run individual modules:
```bash
npm run admin    # Run admin dashboard
npm run frontend # Run frontend
npm run backend  # Run backend
```

### Building

To build all modules:
```bash
npm run build:all
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details 