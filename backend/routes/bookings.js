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

    console.log("Booking request:", {
      user_id,
      show_id,
      seats,
    });

    // Check required fields
    if (!user_id || !show_id || !seats) {
      return res.status(400).json({
        error: "user_id, show_id and seats are required",
      });
    }

    // Check whether user exists
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

    // Check whether show exists
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
       (user_id, show_id, seats)
       VALUES ($1, $2, $3)
       RETURNING booking_id, user_id, show_id, seats`,
      [user_id, show_id, seats]
    );

    console.log("Booking created:", result.rows[0]);

    return res.status(201).json({
      message: "Booking successful!",
      booking: result.rows[0],
    });

  } catch (error) {
    console.error("Booking error:", error);

    return res.status(500).json({
      error: error.message,
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

    return res.json(result.rows);

  } catch (error) {
    console.error("Error fetching booked seats:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});


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
       ORDER BY b.booking_id DESC`,
      [user_id]
    );

    return res.json(result.rows);

  } catch (error) {
    console.error("Error fetching user bookings:", error);

    return res.status(500).json({
      error: error.message,
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

    return res.json(result.rows);

  } catch (error) {
    console.error("Error fetching all bookings:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});


module.exports = router;