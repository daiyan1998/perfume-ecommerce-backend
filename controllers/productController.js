import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Product",
    user: req.user._id,
    image: "/images/sample.png",
    category: "Sample category",
    brand: "Sample Brand",
    description: "This is a sample product description.",
    priceByMl: [
      { ml: 3, price: 100 },
      { ml: 6, price: 180 },
      { ml: 12, price: 380 },
    ],
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, priceByMl, description, image, brand, category } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.priceByMl = priceByMl;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
