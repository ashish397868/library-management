const { Book } = require("../../model/index");

module.exports.deleteBookById = async (req, res) => {
  try {
    const id = req.params.id;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.render("pages/message", { message: "Book not found", user: req.session.userdata });
    }

    await Book.deleteOne({ _id: id });

    const books = await Book.find().populate("authorId", "name nationality bio"); // Fetch author details
    res.redirect("/books"); // Redirect to the book list page 
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error deleting Book", user: req.session.userdata });
  }
};
