const { Author, Book } = require("../../model/index");

module.exports.deleteAuthorById = async (req, res) => {
  try {
    const id = req.params.id;

    const author = await Author.findOne({ _id: id });

    if (!author) {
      return res.render("pages/message", { message: "Author not found" });
    }

    // Check if any book references this author
    const bookCount = await Book.countDocuments({ authorId: id });

    if (bookCount > 0) {
      return res.render("pages/message", { message: "Cannot delete author. Books are associated with this author." });
    }

    //if no book reference to author
    await Author.deleteOne({ _id: id });
    res.redirect("/authors");
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error deleting Author" });
  }
};
