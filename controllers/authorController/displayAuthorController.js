const {Author} = require("../../model/index");

module.exports.displayAuthorTable = async (req, res) => {
  try {
    const authors = await Author.find()
    res.render("pages/authortable", { authors });
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error fetching authors" });
  }
};

module.exports.displayAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findById(authorId)
    if (author) {
      res.render("pages/updateauthor", { author });
    } else {
      res.render("pages/message", { message: "Author not found" });
    }
  } catch (error) {
    console.error(error);
    res.render("pages/message", { message: "Error fetching author" });
  }
};
