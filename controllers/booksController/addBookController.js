const { Book, Author } = require("../../model/index");

module.exports.getAddBook = async(req, res) => {
  const authors = await Author.find();
  res.render("pages/addbook",{authors,user: req.session.userdata});
};

module.exports.addBookPost = async (req, res) => {
  try {
    const { title, genre, publication_year, authorId,quantity } = req.body;
    //convert quantity to number
    const quantityNumber = parseInt(quantity, 10);

    if (!title || !genre || !publication_year || !authorId||!quantity) {
      return res.render("pages/message", { message: "All fields are required!",user: req.session.userdata });
    }

    // Check if the book title already exists
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      return res.render("pages/message", { message: "Book already exists!" ,user: req.session.userdata});
    }

    // Check if the author exists
    const author = await Author.findOne({ authorId });
    if (!author) {
      return res.render("pages/message", { message: "Author not found!" ,user: req.session.userdata});
    }
    const bookToBeAdded = new Book({
      title,
      genre,
      publication_year,
      authorId: author._id,
      quantity:quantityNumber  // Store ObjectId, not `userid`
    });

    await bookToBeAdded.save();
    res.redirect("/books");
    // res.render("pages/message", { message: "Book added successfully!" });
  } catch (err) {
    console.error("Error adding book:", err);
    res.render("pages/message", { message: "An error occurred, please try again!" ,user: req.session.userdata});
  }
};
