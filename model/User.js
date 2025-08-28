const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userid: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength:8
  }
},{timestamps:true});

module.exports = model("User", userSchema);