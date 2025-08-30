const { Book } = require("../../model/index");

module.exports.getDisplayBook = (req, res) => {
  res.render("pages/displaybook");
};

module.exports.displayAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); 
    console.log("Books ", books);
    res.render("pages/books", { books });
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error fetching books" });
  }
};

module.exports.displayBookById = async (req, res) => {
  try {
    const { id } = req.body;
    const book = await Book.findOne({ bookId: id }); 

    if (book) {
      res.render("pages/updatebook", { book: book }); 
    } else {
      res.render("pages/message", { message: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error fetching book" });
  }
};

module.exports.displayBookTable = async (req, res) => {
  try {
    const books = await Book.find();
    res.render("pages/booktable", { books });
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error fetching books" });
  }
};
