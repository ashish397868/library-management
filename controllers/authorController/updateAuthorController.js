const { Author } = require("../../model/index");

module.exports.updateAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { name, bio, nationality } = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(authorId, { name, bio, nationality, auhthorId: req.body.authorId }, { new: true });
    // console.log("Updated Author:", updatedAuthor);

    if (!updatedAuthor) {
      return res.render("pages/message", { message: "Author not found" });
    }

    res.redirect("/authors");
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error updating Author" });
  }
};
