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
  res.render("pages/returnbook", { book, users, borrows, user: req.session.userdata });
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
    // Expect borrowId from admin form (so we delete that specific borrow record)
    const borrowId = req.body.borrowId;
    if (!borrowId) {
      return res.render("pages/message", { message: "No borrow selected for return.", user: req.session.userdata });
    }

    // Find the borrow record
    const borrowRecord = await Borrow.findById(borrowId);
    if (!borrowRecord) {
      return res.render("pages/message", { message: "Borrow record not found.", user: req.session.userdata });
    }

    // Delete the borrow document (admin wants to remove the user's borrow)
    await Borrow.findByIdAndDelete(borrowId);

    // Increase book quantity
    const book = await Book.findById(bookId);
    if (book) {
      book.quantity++;
      await book.save();
    }

    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error returning book.", user: req.session.userdata });
  }
};
