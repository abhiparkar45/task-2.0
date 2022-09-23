const Category = require("../models/category");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// create new category
// End-Point : http://localhost:4000/api/categories/new
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

//get all catgories
//End-Point : http://localhost:4000/api/categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const allCategories = await Category.find();
  res.status(200).json({
    success: true,
    count: allCategories.length,
    allCategories,
  });
});

//update a category
//End-Point : http://localhost:4000/api/category/:id
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

//delete a category
//End-Point : http://localhost:4000/api/category/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "category is deleted",
  });
});

//get a single category
//End-Point : http://localhost:4000/api/category/:id
exports.getCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    category,
  });
});
