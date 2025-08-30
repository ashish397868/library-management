const {User} = require("../../model/index");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports.getSignup = (req, res) => {
  try {
    if (req.session.user) {
      return res.redirect('/books');
    }
    res.render("pages/signup");
  } catch (error) {
    console.error('Signup page error:', error);
    res.status(500).render("pages/message", { message: "Server error" });
  }
};

module.exports.signupPost = async(req, res) => {
  try {
    const { password, userid } = req.body;

    // Input validation
    if (!password || !userid) {
      return res.status(400).render("pages/message", { 
        message: "All fields are required!" 
      });
    }

    if (userid.length < 3) {
      return res.status(400).render("pages/message", { 
        message: "Username must be at least 3 characters long" 
      });
    }

    // Check if user already exists
    const foundUser = await User.findOne({ userid });
    if (foundUser) {
      return res.status(409).render("pages/message", { 
        message: "User already exists!" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      ...req.body,
      password: hashedPassword
    });
    await user.save();
    
    // Generate JWT and set session
    const token = jwt.sign(
      { userid }, 
      process.env.JWT_SECRET, 
      { expiresIn: '3d' }
    );
    
    req.session.user = token;
    req.session.userdata = {
      name: userid,
      userid: userid,
      profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };

    // Set secure session options
    req.session.cookie.secure = process.env.NODE_ENV === 'production';
    req.session.cookie.httpOnly = true;
    req.session.cookie.maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days
    
    res.redirect("/books");
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).render("pages/message", { 
      message: "An error occurred during signup. Please try again." 
    });
  }
};