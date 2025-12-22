const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ msg: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "SECRETMBUR"
    );

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// untuk menerima token atau mengganti bahasa database dengan bahasa kita