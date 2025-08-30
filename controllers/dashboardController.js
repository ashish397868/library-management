const { Borrow, User } = require("../model/index");

module.exports.getDashboard = async (req, res) => {
  try {
    // req.user should be populated by the auth middleware (decoded token)
    // Fallback to session userdata if req.user is not present
    const userid = req.user?.userid || req.session?.userdata?.userid;

    let borrowedCount = 0;
    let user = null;

    if (userid) {
      user = await User.findOne({ userid });
      if (user) {
        // Count active borrow records for this user (not returned)
        borrowedCount = await Borrow.countDocuments({
          userId: user._id,
          $or: [{ returnDate: null }, { returnDate: { $exists: false } }]
        });
      }
    }

    // Provide a simple user object to the view: prefer session userdata
    const viewUser = req.session?.userdata || (user ? { name: user.userid, role: user.role, profilePic: null } : null);
    res.render("pages/dashboard", {
      borrowedCount,
      user: viewUser
    });
  } catch (error) {
    console.error(error);
    res.render("pages/dashboard", {
      borrowedCount: 0,
      user: req.session?.userdata || null
    });
  }
};
