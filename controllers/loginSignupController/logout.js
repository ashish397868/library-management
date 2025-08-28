module.exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).render("pages/message", { 
          message: "Error logging out" 
        });
      }
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).render("pages/message", { 
      message: "Error logging out" 
    });
  }
};