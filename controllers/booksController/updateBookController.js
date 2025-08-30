const { Book } = require("../../model/index");

module.exports.updateBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, genre, publication_year, author } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, { title, genre, publication_year, author }, { new: true });

    if (!updatedBook) {
      return res.render("pages/message", { message: "Book not found" });
    }

    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error updating Book" });
  }
};
