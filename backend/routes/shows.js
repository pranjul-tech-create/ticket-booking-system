const express = require("express");
const router = express.Router();

const pool = require("../db");

// Get all shows
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        show_id,
        movie_id,
        show_date,
        show_time
      FROM shows
      ORDER BY show_date, show_time
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching shows:", error);

    res.status(500).json({
      error: "Failed to fetch shows",
    });
  }
});

module.exports = router;