# Todo App

A full-stack todo application with authentication built using Nuxt.js and Express.js.

## Features

- **Authentication**: User registration and login with JWT tokens stored in HTTP-only cookies
- **Todo Management**: Create, read, update, and delete todos
- **Filtering**: Filter todos by status (all, active, completed)
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS v4
- **API Documentation**: Interactive Swagger documentation
- **Code Quality**: ESLint and Prettier configuration for consistent code style

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Swagger** for API documentation
- **ESLint & Prettier** for code quality

### Frontend
- **Nuxt.js 4** with Vue 3 Composition API
- **Tailwind CSS v4** for styling
- **Vite** for development and building
- **ESLint & Prettier** for code quality

## Project Structure

```
├── server/                 # Backend application
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   └── index.js          # Server entry point
├── client-nuxt/           # Frontend application (Nuxt.js)
│   ├── app/
│   │   ├── components/   # Vue components
│   │   ├── composables/  # Vue composables
│   │   ├── layouts/      # Nuxt layouts
│   │   ├── pages/        # Nuxt pages
│   │   └── assets/       # Static assets
│   ├── nuxt.config.ts    # Nuxt configuration
│   └── package.json      # Frontend dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client-nuxt
   npm install
   ```

### Environment Setup

1. **Create environment file in server directory**
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Update the .env file with your configuration**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   COOKIE_SECRET=your-super-secret-cookie-key
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the frontend development server**
   ```bash
   cd ../client-nuxt
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get current user profile

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

## Development Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm run start    # Start production server
npm run lint     # Run ESLint
npm run lint:fix # Run ESLint with auto-fix
npm run format   # Format code with Prettier
```

### Frontend (Nuxt.js)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run generate  # Generate static site
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## Security Features

- **HTTP-only cookies** for JWT tokens (prevents XSS attacks)
- **Password hashing** with bcrypt
- **Input validation** with express-validator
- **CORS configuration** for cross-origin requests
- **Helmet.js** for security headers
- **Rate limiting** (can be added as needed)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

This project uses ESLint and Prettier for consistent code formatting. Before submitting changes, please run:

```bash
# Backend
npm run lint:fix
npm run format

# Frontend
npm run lint
npm run format
```

## License

This project is licensed under the ISC License.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check the MONGODB_URI in your .env file
   - Verify MongoDB is accessible on the specified port

2. **CORS Errors**
   - Ensure the frontend URL is correctly configured in the server CORS options
   - Check that both servers are running on the correct ports

3. **Authentication Issues**
   - Clear browser cookies if experiencing login issues
   - Check that JWT_SECRET is properly set in .env
   - Verify cookie settings in the browser

4. **Tailwind CSS v4 Issues**
   - Ensure `@tailwindcss/postcss` is installed
   - Check PostCSS configuration in `nuxt.config.ts`
   - Verify Tailwind CSS import in your CSS files

5. **Nuxt.js Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version compatibility (v18+ recommended)
   - Clear .nuxt and node_modules and reinstall if needed
   - Ensure proper TypeScript configuration if using .ts files

6. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version compatibility
   - Clear node_modules and reinstall if needed
