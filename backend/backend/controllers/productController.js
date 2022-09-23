const Product = require("../models/product");
const Category = require("../models/category");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// create new Product
// End-Point : http://localhost:4000/api/products/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await req.body;
  const created = await Product.create(product);

  //const category = await Category.findById(product.category);
  await Category.updateOne(
    { _id: product.category },
    { $push: { Products: created._id } }
  );

  res.status(201).json({
    success: true,
    created,
  });
});

// get all Products
// End-Point : http://localhost:4000/api/products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const filtered = await Product.find({
    category: req.params.id,
  });

  const TotalProducts = await filtered.length;

  const pageNumber = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const startIndex = (pageNumber - 1) * limit;
  const endIndex = pageNumber * limit;

  const category = await Category.findById(req.params.id);
  const categoryName = category.categoryName;

  const finalResult = await filtered.slice(startIndex, endIndex);

  const totalPages = Math.ceil(TotalProducts / limit);
  const totalPagesArr = [];
  let page1 = 1;
  let index1 = 0;
  while (page1 <= totalPages) {
    totalPagesArr[index1] = page1;
    page1++;
    index1++;
  }

  res.status(200).json({
    success: true,
    resultPerPage: limit,
    TotalProducts: TotalProducts,
    pageNumber: pageNumber,
    finalResult: finalResult,
    totalPages: totalPages,
    totalPagesArr: totalPagesArr,
    categoryName: categoryName,
  });
});

// Update a product
// End-Point : http://localhost:4000/api/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: false,
      message: "product not found !",
    });
  }

  updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    updatedProduct,
  });
});

// delete a product
// End-Point : http://localhost:4000/api/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product_id = await req.params.id;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      product_id: product_id,
      message: "Product not found",
    });
  }

  const deleted = await product.remove();
  await Category.updateOne(
    { _id: deleted.category },
    { $pull: { Products: deleted._id } }
  );

  res.status(200).json({
    success: true,
    message: "product is deleted",
    deleted,
    product_id: product_id,
  });
});

// get a single Product
// End-Point : http://localhost:4000/api/product/:id
exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});
