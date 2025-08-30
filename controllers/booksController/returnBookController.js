const { Book, Borrow, User } = require("../../model/index");
const mongoose = require('mongoose');


// GET: Show return book page for admin to select user
module.exports.getReturnBookPage = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.render("pages/message", { message: "Only admin can return books.", user: req.session.userdata });
    }
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.render("pages/message", { message: "Book not found.", user: req.session.userdata });
    }
    // Find all borrow records for this book that have not been returned
    const borrows = await Borrow.find({ bookId: book._id, returnDate: null }).populate('userId');
    // Get users who have borrowed this book
    const users = borrows.map(b => b.userId);
    res.render("pages/returnbook", { book, users, borrows });
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error loading return book page.", user: req.session.userdata });
  }
};

// POST: Handle return book for selected user
module.exports.returnBookById = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.render("pages/message", { message: "Only admin can return books.", user: req.session.userdata });
    }
    const bookId = req.params.id;
    const userId = req.body.userId;
    // cast to ObjectId when possible to avoid mismatch
    let bookObjId = bookId;
    let userObjId = userId;
    try {
      bookObjId = mongoose.Types.ObjectId(bookId);
    } catch (e) {
      // keep as-is
    }
    try {
      userObjId = mongoose.Types.ObjectId(userId);
    } catch (e) {
      // keep as-is
    }

    // Find the borrow record for this user and book (active borrow: returnDate null or not set)
    const borrowRecord = await Borrow.findOne({
      bookId: bookObjId,
      userId: userObjId,
      $or: [ { returnDate: null }, { returnDate: { $exists: false } } ]
    }).sort({ borrowDate: -1 });
    if (!borrowRecord) {
      return res.render("pages/message", { message: "No active borrow record found for this user and book.", user: req.session.userdata });
    }
    // Mark as returned
    borrowRecord.returnDate = new Date();
    await borrowRecord.save();
    // Increase book quantity
    const book = await Book.findById(bookId);
    book.quantity++;
    await book.save();
    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error returning book.", user: req.session.userdata });
  }
};
