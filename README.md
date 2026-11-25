# E-Commerce (Angular + Express)

## 1. Description

A full-stack online store. The Angular storefront lets visitors browse, search, filter and sort products, and lets signed-in admins manage the catalogue and users. It talks to an Express and MongoDB REST API that handles accounts, email confirmation and product data.

## 2. Technologies and Versions

- **Frontend (`Frontend/`)**: Angular ^22.1.0 (standalone components, signals, lazy-loaded routes), Bootstrap ^5.3.8 with @ng-bootstrap/ng-bootstrap ^21.0.0 and bootstrap-icons ^1.13.1, ngx-sonner ^3.1.0 toasts, RxJS ~7.8.0, TypeScript ~6.0.2, Vitest ^4.0.8
- **Backend (`Backend/`)**: Node.js with Express ^5.2.1, MongoDB with Mongoose ^9.9.5, JWT ^9.0.3, bcryptjs ^3.0.3, Nodemailer ^10.0.1, morgan ^1.12.0, cors ^2.8.6, dotenv ^17.4.2, nanoid ^3.3.19, Jest ^30.5.2, nodemon ^3.1.14
- **Deployment**: `Backend/vercel.json` routes everything to `api/index.js`; both parts carry `vercel.json` files

## 3. Requirements and Dependencies

- Node.js and npm installed
- A MongoDB database (local or Atlas) for the backend
- Angular CLI for frontend commands (`npm install -g @angular/cli`)
- Dependencies are installed with `npm install` inside `Backend/` and `Frontend/`

## 4. Installation and Run Steps

```bash
git clone https://github.com/MostafaNegm222/E-commerce-summer.git
cd E-commerce-summer
```

**Backend**

```bash
cd Backend
npm install
cp .env.example .env   # fill in the values (see section 5)
npm start              # nodemon api/index.js
```

**Frontend** (in a second terminal)

```bash
cd Frontend
npm install
npm start              # ng serve on http://localhost:4200
```

## 5. Environment Variables

Backend `.env` (listed in `Backend/.env.example`; no secrets are stored in the repo):

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the API listens on |
| `PRODUCTION_DATABASE` | MongoDB connection string read by `config/connectDB.js` |
| `LOCAL_DATABASE` | Listed in `.env.example` (local connection string) |
| `SALT_ROUNDS` | bcryptjs salt rounds |
| `SECRET_KEY` | Secret used to sign JWTs |
| `USER_EMAIL`, `USER_PASS` | SMTP account for confirmation and reset emails |

The frontend needs no environment variables.

## 6. Usage and Main Features

**Storefront (Angular, `Frontend/`)**

- Home and about pages, a product list with search, filter, sort and pagination, and a product details page.
- Sign up, email confirmation with a one-time code, login, forgot and reset password, and a profile page.
- Route guards: the product list needs a login, auth pages redirect signed-in users to home, `/admin` is limited to the `admin` role.
- An HTTP interceptor adds the saved JWT as a Bearer token to every request.
- Admin area: dashboard with product statistics, manage products (add, edit, delete) and manage users.

**API (Express, `Backend/`)**

- `/auth`: signup, confirm email, login (JWT valid 7 days), forgot and reset password, `GET /me`.
- `/products`: list with filtering (`gt`, `gte`, `lt`, `lte`), search, sort, field selection and pagination; get one; create; update; soft delete; delete; deleted products; statistics. Categories are `clothes`, `sports` and `electronics`.
- `/users`: list, get, create, update, soft delete, delete, deleted users.
- Passwords hashed with bcryptjs, emails through Nodemailer, one global error handler.

## 7. Screenshots / Demo

- Deployed API: https://e-commerce-summer-fzvj.vercel.app

## 8. Running Tests

**Backend**

```bash
cd Backend
npm test               # Jest unit tests in Backend/tests/
```

**Frontend**

```bash
cd Frontend
npm test               # ng test (Vitest)
```
