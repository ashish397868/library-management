const { Schema, model } = require("mongoose");

const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  genre: {
    type: String,
    required: true,
  },
  publication_year: {
    type: Number,
    required: true
  },
  authorId: {  // Correct field for population
    type: Schema.Types.ObjectId,  // Must be ObjectId
    ref: "Author",  // Reference to Author model
    required: true
  },
  quantity:{
    type: Number
  }
},{timestamps:true});

module.exports = model("Books", booksSchema);