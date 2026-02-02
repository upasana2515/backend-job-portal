# Job Portal Backend - AI Coding Guidelines

## Architecture Overview
This is a Node.js Express backend for a job portal application using MongoDB with Mongoose ODM. The app follows an MVC pattern with separate directories for models, controllers, routes, and middleware.

- **Entry Point**: `backend/index.js` - Sets up Express app, connects to MongoDB, mounts routes
- **Database**: MongoDB via Mongoose, connection string from `MONGO_URL` env var
- **Auth**: JWT-based authentication with bcrypt password hashing

## Key Patterns & Conventions

### Authentication Flow
- User registration/login via `/api/auth/register` and `/api/auth/login`
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens signed with `JWT_SECRET` env var, expire in 1 day
- Example: `backend/controllers/authController.js` shows async register/login with error handling

### Response Format
- JSON responses include success/error messages with emojis (✅ for success, ❌ for errors)
- User data returned on successful registration/login
- Errors caught in try/catch blocks, returned as `{ error: err.message }`

### Code Structure
- Controllers export functions (e.g., `exports.register = async (req, res) => {...}`)
- Routes use Express Router, mounted under `/api/auth`
- Models use Mongoose schemas with required fields and unique constraints
- Example: `backend/models/User.js` - User schema with name, email (unique), password

### Environment & Dependencies
- Uses `dotenv` for environment variables (MONGO_URL, JWT_SECRET)
- Key dependencies: express, mongoose, bcryptjs, jsonwebtoken
- No build process - run with `node backend/index.js` after `npm install`

### Middleware
- `backend/middleware/auth.js` - Currently empty, intended for JWT verification middleware
- Use for protecting routes: verify token and attach user to req

### Development Workflow
- Start server: `cd backend && node index.js` (listens on port 3000)
- Root route `/` returns "server working" for health check
- No tests implemented yet - placeholder in package.json
- Debug with standard Node.js debugger or console.log

### Future Extensions
- Add job posting models/controllers/routes following auth pattern
- Implement auth middleware for protected endpoints
- Add validation middleware (e.g., express-validator)
- Consider adding tests with Jest/Supertest</content>
<parameter name="filePath">c:\Users\ripud\OneDrive\Documents\job-portal\.github\copilot-instructions.md