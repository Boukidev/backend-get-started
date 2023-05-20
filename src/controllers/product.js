const Product = require("../models/Product.js");

exports.postProducts = async (req, res, next) => {
  try {
    delete req.body._id;
    const product = await new Product({
      ...req.body,
    });
    product.save();
    res.status(201).json({ message: "Product added !", product: product });
  } catch (error) {
    res.status(400).json({ error });
  }
  next();
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products: products });
    console.log({ products: products });
  } catch (error) {
    res.status(400).json({ error });
  }
  next();
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).json({ product: product });
    console.log({ product: product });
  } catch (error) {
    res.status(404).json({ error });
  }
  next();
};

exports.putProduct = async (req, res, next) => {
  try {
    await Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id });
    res.status(200).json({ message: "Modified !" });
  } catch (error) {
    res.status(400).json({ error });
  }
  next();
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deleted !" });
  } catch (error) {
    res.status(400).json({ error });
  }
  next();
};
