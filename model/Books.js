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
  author: {
    type: String,
    required: true,
    trim: true
  },
  quantity:{
    type: Number
  }
},{timestamps:true});

module.exports = model("Books", booksSchema);