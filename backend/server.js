const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());


// ==========================================
// ROUTES
// ==========================================

const movieRoutes = require("./routes/movies");
const showRoutes = require("./routes/shows");
const bookingRoutes = require("./routes/bookings");
const authRoutes = require("./routes/auth");


// ==========================================
// API ROUTES
// ==========================================

app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Ticket Booking API is running",
  });
});


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Ticket Booking Server is healthy",
  });
});


// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    error: "Internal server error",
  });
});


// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});