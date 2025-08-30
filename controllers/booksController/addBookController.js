const { Book } = require("../../model/index");

module.exports.getAddBook = async(req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.render("pages/message", { message: "Only admin can access this page.", user: req.session.userdata });
  }
  res.render("pages/addbook", { user: req.session.userdata });
};

module.exports.addBookPost = async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    return res.render("pages/message", { message: "Only admin can add books.", user: req.session.userdata });
  }
  try {
    const { title, genre, publication_year, author, quantity } = req.body;
    const quantityNumber = parseInt(quantity, 10);

    if (!title || !genre || !publication_year || !author || !quantity) {
      return res.render("pages/message", { message: "All fields are required!", user: req.session.userdata });
    }

    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.render("pages/message", { message: "Book already exists!", user: req.session.userdata });
    }

    const bookToBeAdded = new Book({
      title,
      genre,
      publication_year,
      author,
      quantity: quantityNumber
    });

    await bookToBeAdded.save();
    res.redirect("/books");
  } catch (err) {
    console.error("Error adding book:", err);
    res.render("pages/message", { message: "An error occurred, please try again!", user: req.session.userdata });
  }
};
