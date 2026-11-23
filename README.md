# E-Commerce (Angular + Express)

A full-stack e-commerce application: an Angular storefront backed by an Express + MongoDB REST API.

## Tech Stack

- **Frontend (`Frontend/`):** Angular, Bootstrap 5 (ng-bootstrap), RxJS, Vitest
- **Backend (`Backend/`):** Node.js, Express, MongoDB with Mongoose
- **Auth:** JWT with bcryptjs password hashing
- **Other:** Nodemailer (email), Morgan (request logging)

## Project Structure

```
├── Backend/    # Express REST API (models, routes, auth)
└── Frontend/   # Angular application
```

## Getting Started

```bash
# Backend
cd Backend && npm install && npm start

# Frontend (new terminal)
cd Frontend && npm install && npm start
```

The backend needs a `.env` with the MongoDB connection string and JWT secret.
