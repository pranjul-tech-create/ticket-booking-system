const express = require("express");
const router = express.Router();

const pool = require("../db");

// Get all movies
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT movie_id, title, duration FROM movies"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({
      error: "Failed to fetch movies",
    });
  }
});

module.exports = router;