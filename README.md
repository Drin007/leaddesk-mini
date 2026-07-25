# LeadDesk Mini

A full-stack MERN application built as part of the Digital Heroes Full Stack Internship Assignment.

## Live Demo

**Frontend:** https://leaddesk-mini-rosy.vercel.app/

**Backend:** https://leaddesk-mini-1gct.onrender.com/

---

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- React Hook Form
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- Cookie Parser
- CORS

---

## Features

### Public Website
- Responsive landing page
- Lead submission form
- Client-side validation
- Stores leads in MongoDB

### Admin Panel
- Cookie-based JWT Authentication
- Protected Dashboard
- View all submitted leads
- Update lead status
- Logout functionality

---

## Authentication

- JWT Token
- HTTP-only Cookies
- Protected Routes
- Authentication Middleware

---

## API Endpoints

### Authentication

POST /api/auth/login

POST /api/auth/logout

---

### Leads

POST /api/leads

GET /api/leads

PATCH /api/leads/:id

---

## Project Structure

```
LeadDesk-Mini
│
├── client
│   ├── components
│   ├── pages
│   ├── services
│   ├── context
│   └── App.js
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone

```bash
git clone https://github.com/Drin007/leaddesk-mini.git
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm start
```

---

## Environment Variables

Backend

```
MONGO_URI=<your atlas uri>
JWT_SECRET=anything
```

---

## Deployment

Frontend deployed on Vercel.

Backend deployed on Render.

MongoDB hosted on MongoDB Atlas.