require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.session.user;

    if (!token) {
      return res.status(401).render("pages/message", { 
        message: "Please login to access this resource",
        user: null
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if token is about to expire (less than 1 day)
      const tokenExp = decoded.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      if (tokenExp - now < 24 * 60 * 60 * 1000) {
        // Generate new token
        const newToken = jwt.sign(
          { userid: decoded.userid }, 
          process.env.JWT_SECRET, 
          { expiresIn: "3d" }
        );
        req.session.user = newToken;
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      req.session.destroy();
      return res.status(401).render("pages/message", { 
        message: "Session expired. Please login again",
        user: null
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).render("pages/message", { 
      message: "Internal server error",
      user: null
    });
  }
};

module.exports = verifyToken;