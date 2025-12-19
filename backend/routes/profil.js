const express = require("express");
const router = express.Router();
const db = require("../config/database");
const verifyToken = require("../middleware/verifyToken");

/* ================= GET PROFILE ================= */
router.get("/", verifyToken, (req, res) => {
  db.query(
    "SELECT id, fullname, email, role, created_at FROM users WHERE id = ?",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ msg: "User not found" });

      res.json(result[0]);
    }
  );
});

module.exports = router;
