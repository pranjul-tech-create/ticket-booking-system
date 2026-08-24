const express = require("express");
const router = express.Router();

const pool = require("../db");

// ==========================================
// CREATE A NEW BOOKING
// POST /api/bookings
// ==========================================
router.post("/", async (req, res) => {
  try {
    const { user_id, show_id, seats } = req.body;

    // Check required fields
    if (!user_id || !show_id || !seats) {
      return res.status(400).json({
        error: "user_id, show_id and seats are required",
      });
    }

    // Check whether the user exists
    const userCheck = await pool.query(
      `SELECT "user id"
       FROM users
       WHERE "user id" = $1`,
      [user_id]
    );

    if (userCheck.rows.length === 0) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }

    // Check whether the show exists
    const showCheck = await pool.query(
      `SELECT show_id
       FROM shows
       WHERE show_id = $1`,
      [show_id]
    );

    if (showCheck.rows.length === 0) {
      return res.status(400).json({
        error: "Show does not exist",
      });
    }

    // Check whether this seat is already booked
    const existingBooking = await pool.query(
      `SELECT booking_id
       FROM bookings
       WHERE show_id = $1
       AND seats = $2`,
      [show_id, seats]
    );

    if (existingBooking.rows.length > 0) {
      return res.status(400).json({
        error: "This seat is already booked.",
      });
    }

    // Create booking
    const result = await pool.query(
      `INSERT INTO bookings
       (user_id, show_id, seats, booking_date)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       RETURNING *`,
      [user_id, show_id, seats]
    );

    res.status(201).json({
      message: "Booking successful!",
      booking: result.rows[0],
    });

  } catch (error) {
    console.error("Booking error:", error);

    res.status(500).json({
      error: "Failed to create booking",
    });
  }
});


// ==========================================
// GET BOOKED SEATS FOR A SHOW
// GET /api/bookings/show/:show_id
// ==========================================
router.get("/show/:show_id", async (req, res) => {
  try {
    const { show_id } = req.params;

    const result = await pool.query(
      `SELECT seats
       FROM bookings
       WHERE show_id = $1
       ORDER BY seats`,
      [show_id]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Error fetching booked seats:", error);

    res.status(500).json({
      error: "Failed to fetch booked seats",
    });
  }
});


// ==========================================
// GET ALL BOOKINGS
// GET /api/bookings
// ==========================================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM bookings
       ORDER BY booking_id DESC`
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Error fetching bookings:", error);

    res.status(500).json({
      error: "Failed to fetch bookings",
    });
  }
});


// ==========================================
// EXPORT ROUTER
// ==========================================
// ==========================================
// GET BOOKINGS FOR A USER
// GET /api/bookings/user/:user_id
// ==========================================
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `SELECT
          b.booking_id,
          b.user_id,
          b.show_id,
          b.seats,
          b.booking_date,
          s.movie_id,
          s.show_date,
          s.show_time,
          m.title,
          m.duration
       FROM bookings b
       JOIN shows s
         ON b.show_id = s.show_id
       JOIN movies m
         ON s.movie_id = m.movie_id
       WHERE b.user_id = $1
       ORDER BY b.booking_date DESC`,
      [user_id]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Error fetching user bookings:", error);

    res.status(500).json({
      error: "Failed to fetch user bookings",
    });
  }
});
module.exports = router;