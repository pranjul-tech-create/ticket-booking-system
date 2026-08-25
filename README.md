# 🎬 Ticket Booking System

<p align="center">
  <img src="https://img.shields.io/badge/FULL--STACK-PROJECT-6C63FF?style=for-the-badge" alt="Full Stack Project"/>
</p>

<p align="center">
  <strong>🎟️ A Full-Stack Movie Ticket Booking Platform</strong>
</p>

<p align="center">
  React • Node.js • Express.js • PostgreSQL
</p>

<br>

<p align="center">
  <a href="https://ticket-booking-system-nine-delta.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_LIVE_DEMO-OPEN_WEBSITE-00C853?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<p align="center">
  <a href="https://github.com/pranjul-tech-create/ticket-booking-system">
    <img src="https://img.shields.io/badge/📂_SOURCE_CODE-VIEW_ON_GITHUB-181717?style=for-the-badge&logo=github" alt="Source Code"/>
  </a>
</p>

---

## 🧰 Technology Stack

<p align="center">

<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-Language-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

</p>

<p align="center">

<img src="https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/REST_API-Architecture-02569B?style=for-the-badge"/>

</p>

<p align="center">

<img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white"/>

</p>

---

## 📌 Overview

**Ticket Booking System** is a full-stack web application designed to provide a complete movie ticket booking experience.

Users can register and log in, browse available movies, select show dates and times, choose seats, complete bookings and view their booking history.

The project demonstrates how a modern React frontend communicates with a Node.js and Express.js backend through REST APIs while using PostgreSQL for persistent data storage.

---

## ✨ Features

### 👤 User Authentication

* User registration
* User login
* Authentication-based booking workflow

### 🎬 Movie & Shows

* Browse available movies
* Display movie information
* Select show date and time
* Choose a specific show before booking

### 💺 Seat Booking

* Interactive seat selection
* Select available seats
* Booking confirmation
* Prevent already booked seats from being booked again

### 🎟️ My Bookings

* View personal bookings
* Retrieve booking information
* Persistent booking records

### 🗄️ Database

* PostgreSQL database
* User data storage
* Movie and show information
* Seat availability data
* Booking records

### 🔌 REST API

* Frontend-backend communication through REST APIs
* Express.js routing
* Backend database integration

---

## 📊 Project Highlights

<p align="center">

<img src="https://img.shields.io/badge/🔐_Authentication-Implemented-success?style=flat-square"/>
<img src="https://img.shields.io/badge/🎬_Movie_Browsing-Implemented-success?style=flat-square"/>
<img src="https://img.shields.io/badge/🕐_Show_Selection-Implemented-success?style=flat-square"/>

</p>

<p align="center">

<img src="https://img.shields.io/badge/💺_Seat_Selection-Implemented-success?style=flat-square"/>
<img src="https://img.shields.io/badge/🎟️_Ticket_Booking-Implemented-success?style=flat-square"/>
<img src="https://img.shields.io/badge/🗄️_PostgreSQL-Integrated-success?style=flat-square"/>

</p>

---

## 🔄 Booking Workflow

```text
                         🎬 MOVIE
                            │
                            ▼
                     🕐 SELECT SHOW
                            │
                            ▼
                      💺 SELECT SEATS
                            │
                            ▼
                   🔍 CHECK AVAILABILITY
                            │
                            ▼
                    🎟️ CONFIRM BOOKING
                            │
                            ▼
                    🗄️ SAVE TO DATABASE
                            │
                            ▼
                     📋 MY BOOKINGS
```

---

## 🏗️ Application Architecture

```text
┌─────────────────────────────────┐
│        ⚛️ React Frontend        │
│             + Vite              │
└───────────────┬─────────────────┘
                │
                │ HTTP / REST API
                ▼
┌─────────────────────────────────┐
│       🟢 Node.js Backend        │
│          ⚡ Express.js           │
└───────────────┬─────────────────┘
                │
                │ Database Queries
                ▼
┌─────────────────────────────────┐
│         🐘 PostgreSQL            │
│            Database              │
└─────────────────────────────────┘
```

---

## 📁 Project Structure

```text
ticket-booking-system/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── service/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🔌 REST API

The frontend communicates with the backend through REST API endpoints.

### 🔐 Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### 🎬 Movies

```text
GET /api/movies
```

### 🕐 Shows

```text
GET /api/shows
```

### 🎟️ Bookings

```text
POST /api/bookings
GET /api/bookings
```

> Note: API endpoint names should match the routes implemented in the current backend.

---

## 🗄️ Database

The application uses **PostgreSQL** as its relational database.

The database stores and manages information related to:

* 👤 Users
* 🎬 Movies
* 🕐 Shows
* 💺 Seats
* 🎟️ Bookings

The backend communicates with PostgreSQL to create, retrieve and update application data.

---

## ⚙️ Local Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pranjul-tech-create/ticket-booking-system.git

cd ticket-booking-system
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
```

> Replace `your_postgresql_connection_string` with your own PostgreSQL connection string when running the project locally.

**Never commit your actual `.env` file or database credentials to GitHub.**

### 4. Start the Backend

```bash
npm start
```

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

The frontend will run using the Vite development server.

---

## 🔐 Environment Variables

The application uses environment variables to keep configuration and database credentials separate from the source code.

Example:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
```

The `.env` file should remain private and should not be committed to the repository.

---

## 🧠 Concepts Demonstrated

This project demonstrates practical experience with:

* ⚛️ React component development
* 🟨 JavaScript
* ⚡ Vite
* 🟢 Node.js
* 🚀 Express.js
* 🔌 REST API development
* 🐘 PostgreSQL
* 🗄️ Database integration
* 🔄 CRUD operations
* 🔐 Authentication workflow
* 💺 Seat availability logic
* 🎟️ Booking management
* 🔗 Frontend-backend integration
* 🔒 Environment variable management
* ☁️ Full-stack deployment

---

## 🚀 Deployment

### Frontend

The frontend is deployed using **Vercel**.

### Backend

The backend is designed to run on a Node.js-compatible hosting platform.

### Database

The application uses **PostgreSQL** for persistent data storage.

---

## 🔮 Future Improvements

Possible improvements for future versions include:

* 🔐 JWT-based authentication
* 🔒 Password hashing with bcrypt
* 💳 Payment gateway integration
* 📧 Email booking confirmation
* 📱 QR-code based tickets
* 🛠️ Admin dashboard
* 🔎 Movie search and filtering
* ❌ Booking cancellation
* 📱 Improved mobile responsiveness
* 🧪 Automated testing
* 🔄 CI/CD pipeline

---

## 📚 What I Learned

Building this project provided practical experience in developing and connecting the different layers of a full-stack application.

I learned how a React frontend communicates with an Express.js backend through REST APIs, how PostgreSQL can be integrated into a web application, and how booking logic can be connected with persistent database storage.

The project also strengthened my understanding of frontend-backend integration, database operations and real-world application workflows.

---

## 🌐 Live Project

<p align="center">

<a href="https://ticket-booking-system-nine-delta.vercel.app/">
  <img src="https://img.shields.io/badge/🚀_TRY_THE_LIVE_PROJECT-OPEN_NOW-6C63FF?style=for-the-badge"/>
</a>

</p>

<p align="center">
  <i>Experience the complete movie ticket booking workflow.</i>
</p>

---

## 👩‍💻 Author

<p align="center">

<strong>PranjulParashar</strong>

<br/>

B.Tech Computer Science & Engineering

<br/><br/>

<a href="https://github.com/pranjul-tech-create">
  <img src="https://img.shields.io/badge/GitHub-Pranjul--Tech--Create-181717?style=for-the-badge&logo=github"/>
</a>

</p>

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  <strong>Built with ❤️ using React • Node.js • Express.js • PostgreSQL</strong>
</p>
