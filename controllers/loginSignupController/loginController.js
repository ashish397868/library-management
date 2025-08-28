const { User } = require("../../model/index");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports.getLogin = (req, res) => {
  try {
    if (req.session.user) {
      return res.redirect('/books');
    }
    res.render("pages/login");
  } catch (error) {
    console.error('Login page error:', error);
    res.status(500).render("pages/message", { message: "Server error" });
  }
};

module.exports.loginPost = async (req, res) => {
  try {
    const { userid, password } = req.body;

    // Input validation
    if (!userid || !password) {
      return res.status(400).render("pages/message", { 
        message: "All fields are required!" 
      });
    }

    if (password.length < 8) {
      return res.status(400).render("pages/message", { 
        message: "Password must be at least 8 characters long" 
      });
    }

    const existingUser = await User.findOne({ userid });
    if (!existingUser) {
      return res.status(401).render("pages/message", { 
        message: "Invalid credentials!" 
      });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).render("pages/message", { 
        message: "Invalid credentials!" 
      });
    }

    // Generate JWT token and set session
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: "3d" });
    req.session.user = token;
    req.session.userdata = {
      name: existingUser.userid,
      userid: existingUser.userid,
      profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };

    // Set secure session options
    req.session.cookie.secure = process.env.NODE_ENV === 'production';
    req.session.cookie.httpOnly = true;
    req.session.cookie.maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days

    res.redirect("/books");
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).render("pages/message", { 
      message: "An error occurred during login. Please try again." 
    });
  }
};

