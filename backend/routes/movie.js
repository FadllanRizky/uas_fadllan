const express = require("express");
const router = express.Router();
const db = require("../config/database");

const getYoutubeEmbed = (url) => {
  if (!url) return null;

  if (url.includes("embed")) return url;

  let videoId = "";

  if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }

  return videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : null;
};


/* ================= GET ALL MOVIES ================= */
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      m.id,
      m.title,
      m.description,
      m.rating,
      m.release_year,
      m.duration,
      m.poster_url,
      m.trailer_url,
      m.director,
      GROUP_CONCAT(g.name) AS genres
    FROM movies m
    LEFT JOIN movie_genres mg ON m.id = mg.movie_id
    LEFT JOIN genres g ON mg.genre_id = g.id
    GROUP BY m.id
    ORDER BY m.release_year DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    const data = results.map((m) => ({
      ...m,
      genres: m.genres ? m.genres.split(",") : [],
    }));

    res.json(data);
  });
});

/* ================= ADD MOVIE ================= */
router.post("/", (req, res) => {
  const {
    title,
    description,
    rating,
    release_year,
    duration,
    poster_url,
    trailer_url,
    director,
  } = req.body;

  const sql = `
    INSERT INTO movies
    (title, description, rating, release_year, duration, poster_url, trailer_url, director)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      description,
      rating,
      release_year,
      duration,
      poster_url,
      trailer_url,
      director,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Movie added", id: result.insertId });
    }
  );
});

/* ================= UPDATE MOVIE ================= */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    rating,
    release_year,
    duration,
    poster_url,
    trailer_url,
    director,
  } = req.body;

  const sql = `
    UPDATE movies SET
      title = ?,
      description = ?,
      rating = ?,
      release_year = ?,
      duration = ?,
      poster_url = ?,
      trailer_url = ?,
      director = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title,
      description,
      rating,
      release_year,
      duration,
      poster_url,
      trailer_url,
      director,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Movie updated" });
    }
  );
});

/* ================= DELETE MOVIE ================= */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM movies WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Movie deleted" });
  });
});

module.exports = router;

// bagian CRUD untuk movie