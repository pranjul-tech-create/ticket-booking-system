const express = require("express");
const router = express.Router();

const pool = require("../db");

// ==========================================
// REGISTER USER
// POST /api/auth/register
// ==========================================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const existingUser = await pool.query(
      `SELECT "user id"
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const result = await pool.query(
      `INSERT INTO users
       (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING "user id", name, email`,
      [name, email, password]
    );

    res.status(201).json({
      message: "Registration successful!",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      error: "Failed to register user",
    });
  }
});

// ==========================================
// LOGIN USER
// POST /api/auth/login
// ==========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const result = await pool.query(
      `SELECT "user id", name, email, password
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    delete user.password;

    res.json({
      message: "Login successful!",
      user: user,
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: "Failed to login",
    });
  }
});

module.exports = router;