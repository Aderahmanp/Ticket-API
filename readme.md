# Ticket-API

## 📋 Features

- **User Management**
  - Register and login (JWT authentication)
  - User roles: `admin` and `customer`
  - Profile update and deletion
  - Admin can view, update, and delete any user

- **Ticket Management**
  - Create, update, delete, and view tickets
  - Each ticket is linked to a user
  - Ticket status: `open`, `in_progress`, `resolved`, `closed`
  - Admin can view all tickets; customers can view their own

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control for admin/customer endpoints

- **Data Seeding**
  - Seed script to generate dummy users and tickets for testing

---

## 🛠️ Technology Stack

- **Node.js** & **Express.js** (REST API)
- **MongoDB** & **Mongoose** (database & ODM)
- **JWT** (authentication)
- **bcryptjs** (password hashing)
- **dotenv** (environment variables)
- **Nodemon** (development auto-reload)

---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Ticket-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory:
     ```
     MONGODB_URL=<your-mongodb-connection-string>
     JWT_SECRET_KEY=<your-jwt-secret>
     ```

4. **Run the server**
   ```bash
   npm run dev
   ```
   - The API will be available at `http://localhost:4322`

5. **Seed dummy data (optional)**
   - While running in development mode (`npm run dev`), you can seed the database by making a `POST` request to the following endpoint.
   - This will delete all existing data and create 10 users (2 admin, 8 customer) and 10 tickets for each.
   - **You must be authenticated as an admin to use this endpoint.**
   - `POST /api/test/seed-database`

---

## 📚 API Endpoints Overview

- **User**
  - `POST /api/users/register` — Register new user
  - `POST /api/users/login` — Login and get JWT
  - `GET /api/users/profile` — Get own profile
  - `PUT /api/users/profile` — Update own profile
  - `DELETE /api/users/profile` — Delete own account
  - `GET /api/users/` — (admin) Get all users

- **Ticket**
  - `POST /api/tickets/` — Create ticket
  - `GET /api/tickets/my-tickets` — Get own tickets
  - `GET /api/tickets/` — (admin) Get all tickets
  - `GET/api/tickets/:id` — (admin) Get ticket by id
  - `GET/api/tickets/status/:status` — (admin) Get all tickets status
  - `PUT/api/tickets/:id` — (admin) Update status ticket
  - `DELETE/api/tickets/:id` — (admin) Delete ticket

- **Test (Development Only)**
  - `POST /api/test/reset-database` — (admin) Deletes all data from the database.
  - `POST /api/test/seed-database` — (admin) Resets and seeds the database with test data.

---

## 📝 Notes

- Use the `Authorization: Bearer <token>` header for protected endpoints.
- Only admins can access admin endpoints.
- For development, use tools like Postman to test API requests.

---

## ⚖️ License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---