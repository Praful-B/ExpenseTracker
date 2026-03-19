# Fintrak

A full-stack personal expense tracking web application built with the MERN stack. Fintrak allows users to log, categorize, and visualize their spending through an interactive dashboard with charts and transaction history.

---

## Features

- User registration and login with JWT-based authentication
- Add expenses with category, amount, date, and description
- Delete expenses from the transaction table
- Pie chart showing spending breakdown by category
- Bar chart showing month-by-month spending for the current year
- Area chart showing week-by-week spending trend for the current month
- Total expenses vs monthly budget comparison panel
- Export all expenses to a CSV file
- Protected dashboard route — unauthenticated users are redirected to login
- Responsive two-column dashboard layout

---

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (component library)
- Recharts (data visualization)
- React Router v6
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication

---

## Project Structure

```
fintrak/
├── client/                         # React frontend
│   ├── src/
│   │   ├── features/
│   │   │   └── Authentication/
│   │   │       ├── pages/
│   │   │       │   ├── Dashboard.tsx
│   │   │       │   ├── UserLoginPage.tsx
│   │   │       │   └── UserRegistrationPage.tsx
│   │   │       └── components/
│   │   │           ├── DashboardHeader.tsx
│   │   │           ├── AddExpensePanel.tsx
│   │   │           ├── RecentTransactionPanel.tsx
│   │   │           ├── ExpenseBreakdown.tsx
│   │   │           ├── SpendingOverview.tsx
│   │   │           ├── TotalExpenseVsMonthlyBudget.tsx
│   │   │           └── ExpenseTrend.tsx
│   │   └── utils/
│   │       └── ProtectedRoutes.tsx
│   └── .env
└── server/                         # Express backend
    ├── routes/
    │   ├── auth.js
    │   └── expense.js
    ├── models/
    │   ├── User.js
    │   └── Expense.js
    └── middleware/
        └── auth.js
```

---

## Getting Started

### Prerequisites

- Node.js v18 or above
- MongoDB (local instance or MongoDB Atlas)

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT |

### Expenses

All expense routes require a valid JWT passed as `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/expense/getAllExpense` | Fetch all expenses for the logged-in user |
| POST | `/expense/createExpense` | Create a new expense |
| DELETE | `/expense/deleteExpense/:id` | Delete an expense by ID |

---

## Expense Categories

- Food
- Travel
- Social
- Stationary
- Util
- Default

---

## Authentication

Fintrak uses stateless JWT authentication. On login, the token is stored in `localStorage` and attached to every API request as a Bearer token. Logout clears the token from `localStorage` and redirects to the login page. No server-side session or token blacklisting is required.

---

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `MONGO_URI` | server/.env | MongoDB connection string |
| `JWT_SECRET` | server/.env | Secret key for signing JWTs |
| `PORT` | server/.env | Port for the Express server |
| `VITE_API_URL` | client/.env | Base URL for the backend API |

---

## Author

Praful — [github.com/Praful-B](https://github.com/Praful-B)