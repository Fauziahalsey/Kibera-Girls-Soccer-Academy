# Kibera Girls Soccer Academy - Backend Server

Node.js/Express backend server for the Kibera Girls Soccer Academy web application.

## Project Structure

```
server/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── routes/
│   │   ├── health.ts         # Health check endpoint
│   │   ├── donations.ts      # Donation processing endpoints
│   │   └── contact.ts        # Contact form endpoints
│   └── controllers/          # (For future business logic)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
API_TIMEOUT=30000
```

## Running the Server

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:3000` with hot-reload enabled.

### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Donations
- **GET** `/api/donations` - Get donation information
- **POST** `/api/donations` - Submit a donation
  - Body: `{ amount, donorName, email, message }`

### Contact
- **POST** `/api/contact` - Submit contact form
  - Body: `{ name, email, subject, message }`

## Running Frontend and Backend Together

From the root directory:

```bash
# Development mode - runs both frontend and backend concurrently
npm run dev:all

# Backend only
npm run dev:backend

# Frontend only
npm run dev
```

## CORS Configuration

The backend is configured to accept requests from:
- Frontend: `http://localhost:8080` (development)
- Update `FRONTEND_URL` in `.env` for production

## TODO - Next Steps

1. **Database Integration**
   - Set up MongoDB/PostgreSQL connection
   - Create models for donations and contact messages

2. **Payment Processing**
   - Integrate Stripe or Flutterwave for donations
   - Add payment verification endpoints

3. **Email Functionality**
   - Configure SendGrid/Nodemailer
   - Send confirmation emails to donors
   - Send notifications to admin

4. **Authentication**
   - Add JWT or session-based authentication
   - Create admin dashboard endpoints

5. **Validation & Error Handling**
   - Add comprehensive input validation
   - Implement error logging

## Development Commands

```bash
npm run dev      # Start development server with hot-reload
npm run build    # Compile TypeScript to JavaScript
npm run start    # Run compiled server
npm run lint     # Run ESLint
```

## Dependencies

- **express**: Web framework
- **cors**: Cross-Origin Resource Sharing
- **body-parser**: Request body parsing
- **dotenv**: Environment variable management

## Dev Dependencies

- **typescript**: TypeScript compiler
- **tsx**: TypeScript execution
- **@types/express**: Express type definitions
- **eslint**: Code linting
