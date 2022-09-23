const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Please Enter catogory name !"],
    trim: true,
    maxLength: [40, "category name cannot exceed 30 !"],
  },
  Products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Categories", categorySchema);
