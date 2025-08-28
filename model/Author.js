const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true
  },
  authorId: {  
    type:String,
    required: true,
    unique:true
  }
},{timestamps:true});

module.exports = model("Author", authorSchema);