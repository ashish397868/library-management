const { Borrow, Book, User } = require("../model/index");

module.exports.getAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    if (!books) {
      return res.render("pages/message", { message: "No books available" });
    }

    const availableBooks = books.filter((book) => book.quantity > 0);

    if (availableBooks.length === 0) {
      return res.render("pages/message", { message: "No books available" });
    }
    res.render("pages/availableBooks", { books: availableBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getBorrowBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("authorId");
    const users = await User.find();

    res.render("pages/borrowBook", { book, users });
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error in fetching book details" });
  }
};

module.exports.getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await Borrow.find()
      .populate("bookId")
      .populate("userId")
      .populate({
        path: "bookId",
        populate: {
          path: "authorId",
        },
      });

    res.render("pages/borrowedbooktable", { books: borrowedBooks });
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error in fetching borrowed books" });
  }
};

module.exports.borrowBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.render("pages/message", { message: "Book not found" });
    }

    if (book.quantity <= 0) {
      return res.render("pages/message", { message: "Book not available" });
    }

    const borrow = new Borrow({
      bookId,
      userId,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    });

    await borrow.save();

    // Decrease the quantity of available books
    book.quantity--;
    await book.save();

    res.redirect("/borrow/books");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getReturnBook = async (req, res) => {
  try {
    const borrowedBook = await Borrow.findById(req.params.id)
      .populate("bookId")
      .populate("userId")
      .populate({
        path: "bookId",
        populate: {
          path: "authorId",
        },
      });

    const users = await User.find();

    res.render("pages/returnbook", { book: borrowedBook, users });
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error in fetching borrowed book details" });
  }
};

module.exports.returnBook = async (req, res) => {
  try {
    const borrowId = req.body.borrowId;
    const borrowedBook = await Borrow.findById(borrowId);

    if (!borrowedBook) {
      return res.render("pages/message", { message: "Borrowed book not found" });
    }

    // Increase the quantity of returned book
    const book = await Book.findById(borrowedBook.bookId);
    book.quantity++;
    await book.save();

    // Delete the borrow record
    await Borrow.findByIdAndDelete(borrowId);

    res.redirect("/borrow/borrowed");
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error in returning book" });
  }
};
