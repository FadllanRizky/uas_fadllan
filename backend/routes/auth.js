const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* =========================
   REGISTER (USER)
========================= */
router.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || fullname.length < 3)
    return res.status(400).json({ msg: "Fullname minimal 3 karakter" });

  if (!email || !emailRegex.test(email))
    return res.status(400).json({ msg: "Email tidak valid" });

  if (!password || password.length < 5)
    return res.status(400).json({ msg: "Password minimal 5 karakter" });

  db.query("SELECT id FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ msg: "Database error" });
    if (result.length > 0)
      return res.status(400).json({ msg: "Email sudah digunakan" });

    const hash = await bcrypt.hash(password, 10);

    // 🔽 ROLE DEFAULT USER
    db.query(
      "INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, 'user')",
      [fullname, email, hash],
      (err) => {
        if (err) return res.status(500).json({ msg: "Gagal membuat akun" });
        res.json({ msg: "Register berhasil" });
      }
    );
  });
});

/* =========================
   LOGIN (ADMIN & USER)
========================= */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email dan password wajib diisi" });

  // 🔽 SATU QUERY SAJA
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ msg: "Database error" });
    if (result.length === 0)
      return res.status(400).json({ msg: "Email tidak terdaftar" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ msg: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "SECRETMBUR",
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login berhasil",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  });
});

module.exports = router;
