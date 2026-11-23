# E-Commerce (Angular + Express)

A full-stack online store. The Angular storefront lets visitors browse, search, filter and sort products, and lets signed-in admins manage the catalogue and users. It talks to an Express and MongoDB REST API that handles accounts, email confirmation and product data.

## What it does

**Storefront (Angular, `Frontend/`)**
- Home and about pages, a product list with search, filter, sort and pagination, and a product details page.
- Sign up, email confirmation with a one-time code, login, forgot and reset password, and a profile page.
- Route guards: product list needs a login, auth pages redirect signed-in users to home, `/admin` is limited to the `admin` role.
- An HTTP interceptor adds the saved JWT as a Bearer token to every request.
- Admin area: dashboard with product statistics, manage products (add, edit, delete) and manage users.

**API (Express, `Backend/`)**
- `/auth`: signup, confirm email, login (JWT valid 7 days), forgot and reset password, `GET /me`.
- `/products`: list with filtering (`gt`, `gte`, `lt`, `lte`), search, sort, field selection and pagination; get one; create; update; soft delete; delete; deleted products; statistics. Categories are `clothes`, `sports` and `electronics`.
- `/users`: list, get, create, update, soft delete, delete, deleted users.
- Passwords are hashed with bcryptjs, emails go out through Nodemailer, errors go through one global handler.

## Tech stack

- **Frontend:** Angular 22 (standalone components, signals, lazy-loaded routes), Bootstrap 5, ng-bootstrap, ngx-sonner toasts, RxJS, Vitest
- **Backend:** Node.js, Express 5, MongoDB with Mongoose 9, JWT, bcryptjs, Nodemailer, Jest
- **Deployment files:** `Backend/vercel.json` routes everything to `api/index.js`

## Project structure

```
├── Backend/
│   ├── api/index.js       # Entry point (connects to MongoDB, starts the server)
│   ├── app.js             # Express app and routes
│   ├── controllers/  models/  routes/  middlewares/  utils/
│   └── tests/             # Jest unit tests
└── Frontend/
    └── src/app/           # components, pages, layouts, guards, interceptors, services, models
```

## Run it locally

You need Node.js and a MongoDB database.

**Backend**

```bash
cd Backend
npm install
cp .env.example .env   # fill in the values
npm start              # nodemon api/index.js
```

Variables: `PORT`, `PRODUCTION_DATABASE` (the MongoDB connection string that `config/connectDB.js` reads), `SALT_ROUNDS`, `SECRET_KEY`, `USER_EMAIL`, `USER_PASS`. `.env.example` also lists `LOCAL_DATABASE`, which the code does not use.

**Frontend**

```bash
cd Frontend
npm install
npm start              # ng serve, http://localhost:4200
```

The Angular services currently call a deployed API (`https://e-commerce-summer-fzvj.vercel.app`). To use your local backend, change `apiLink`, `userLink` in `Frontend/src/app/services/auth-service.ts` and `apiLink` in `product-service.ts` to `http://localhost:5000`.

## Tests

```bash
cd Backend && npm test      # 16 Jest tests
cd Frontend && npm test     # 16 Vitest tests
```

- Backend: the query builder (filter, search, sort, fields, pagination), auth and role middleware, global error handler and `AppError`. Models are mocked, so no database is needed.
- Frontend: the three route guards, the auth interceptor, `AuthService` token handling and app creation. The component specs that came with the Angular CLI are only "should create" checks.

## Notes

- Controllers and the email sending are not covered by tests.
- The backend `start` script pointed to a file that does not exist (`index.js`). It now runs `api/index.js`.
