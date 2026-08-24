const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
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
// START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});