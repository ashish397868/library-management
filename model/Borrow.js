const { Schema, model } = require("mongoose");
const BorrowSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model("Borrow", BorrowSchema);
