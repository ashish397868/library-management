module.exports.getDashboard = (req, res) => {
   res.render("pages/dashboard", {
    borrowedCount: 3
  });
};
