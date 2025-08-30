const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userid: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
},{timestamps:true});

module.exports = model("User", userSchema);