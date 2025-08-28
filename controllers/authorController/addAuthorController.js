const { Author } = require("../../model/index");

module.exports.getAddAuthor = (req, res) => {
  res.render("pages/addauthor", {user: req.session.userdata});
};

module.exports.addAuthorPost = async (req, res) => {
  try {
    const author = req.body;
    console.log(author);
    if (!author.name || !author.bio || !author.nationality || !author.authorId) {
      return res.render("pages/message", { message: "All fields are required!" });
    }

    const authorToBeAdded = new Author(req.body);
    await authorToBeAdded.save();
    res.redirect('/authors'); 
  } catch (err) {
    console.error("Error adding Author:", err);
    res.render("pages/message", { message: "An error occurred, please try again!" });
  }
};
