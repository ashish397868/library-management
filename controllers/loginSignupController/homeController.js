module.exports.redirectHome = (req, res) => {
  if (req.session.user) {
    res.redirect("/books");
  } else {
    res.redirect("/login");
  }
};

