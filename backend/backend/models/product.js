const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please Enter Product name !"],
    trim: true,
    maxLength: [20, "Product name cannot exceed 20 !"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", productSchema);
