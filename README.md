Student Management System

A full-stack web application to manage student records, built as part of my internship task. It supports adding, viewing, updating, and deleting student information through a REST API connected to a PostgreSQL database.

Features
Add new student records
View all students in a clean table layout
Update existing student details
Delete student records
Server-side validation (required fields, semester range)
Duplicate prevention for roll number and email
RESTful API connecting the React frontend to the Express backend
Tech Stack

Frontend: React (Vite), Axios Backend: Node.js, Express.js Database: PostgreSQL Tools: Postman, pgAdmin, Git

Project Structure
student-management-system/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic for each route
│   ├── routers/         # API route definitions
│   ├── index.js         # App entry point
│   └── .env              # Environment variables (not committed)
└── frontend/
    └── src/
        ├── api/            # Axios calls to the backend
        ├── components/     # StudentForm, StudentTable
        └── App.jsx
API Endpoints
Method	Endpoint	Description
GET	/api/students	Get all students
GET	/api/students/:id	Get a single student
POST	/api/students	Add a new student
PUT	/api/students/:id	Update a student
DELETE	/api/students/:id	Delete a student
Getting Started
Prerequisites
Node.js installed
PostgreSQL installed and running
1. Clone the repository
bash
git clone https://github.com/AbdulManan2005/student-management-system.git
cd student-management-system
2. Set up the database

In pgAdmin (or psql), create a database and run:

sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  roll_number VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  course VARCHAR(100) NOT NULL,
  semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 12),
  created_at TIMESTAMP DEFAULT NOW()
);
3. Set up the backend
bash
cd backend
npm install

Create a .env file inside backend/ with:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=your_database_name

Run the backend:

bash
npm run dev

The API will be available at http://localhost:5000.

4. Set up the frontend

Open a new terminal:

bash
cd frontend
npm install
npm run dev

The app will be available at http://localhost:5173.

What I Learned
Designing and connecting a PostgreSQL database to an Express backend
Building RESTful CRUD APIs (GET, POST, PUT, DELETE)
Testing APIs independently with Postman before frontend integration
Managing state and API calls in React
Structuring a full-stack project cleanly (routers, controllers, config)
Author: Abdul Manan

Abdul Manan GitHub: @AbdulManan2005