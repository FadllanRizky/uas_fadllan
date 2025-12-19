const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");
const adminRoutes = require("./routes/admin");
const genreRoutes = require("./routes/genre");
const profileRoutes = require("./routes/profil"); // ⬅️ WAJIB

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profil", profileRoutes); // ⬅️ SEKARANG HIDUP
app.use("/genres", genreRoutes);

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
