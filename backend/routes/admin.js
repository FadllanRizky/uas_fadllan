const express = require("express");
const router = express.Router();
const db = require("../config/database");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

/* ================= GET USERS ================= */
router.get("/users", verifyToken, isAdmin, (req, res) => {
  db.query(
    "SELECT id, fullname, email, role FROM users",
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Database error" });
      res.json(result);
    }
  );
});

/* ================= UPDATE USER ================= */
router.put("/users/:id", verifyToken, isAdmin, (req, res) => {
  const { fullname, email, role } = req.body;

  db.query(
    "UPDATE users SET fullname=?, email=?, role=? WHERE id=?",
    [fullname, email, role, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ msg: "Update failed" });
      res.json({ msg: "User updated" });
    }
  );
});
/* ================= DELETE USER ================= */
router.delete("/users/:id", verifyToken, isAdmin, (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ msg: "Delete failed" });
      res.json({ msg: "User deleted" });
    }
  );
});

module.exports = router;


// CRUD untuk bagian Users yang cuman bisa di lakukan sama admin