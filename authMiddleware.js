const jwt = require("jsonwebtoken");
const logger = require("./logger");

const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    logger.error("No token provided");
    // return res.sendStatus(401); // Unauthorized if no token
    return res.status(401).json({ error: "No token provided" }); // Unauthorized if no token
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      logger.error("Token is not valid");
      //   return res.status(403); // Forbidden if toke is invalid
      return res.status(403).json({ error: "Invalid token" }); // Forbidden if token is invalid
    }
    req.user = user;
    next();
  });
};

module.exports = authenticationToken;
