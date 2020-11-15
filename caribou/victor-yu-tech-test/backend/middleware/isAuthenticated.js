const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET_KEY;

const isAuthenticated = (req, res, next) => {
  try {
    const authenticationToken = req.header("Authentication-Token");
    if (!authenticationToken) {
      console.log("no token");
      res
        .status(401)
        .json({ msg: "No authentication token, authorization denied!" });
    }
    const verifiedAuthenticationToken = jwt.verify(authenticationToken, jwtKey);
    if (!verifiedAuthenticationToken) {
      res.status(401).json({
        msg: "Authentication token unverified, authorization denied!",
      });
    }
    req.user = verifiedAuthenticationToken.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = isAuthenticated;
