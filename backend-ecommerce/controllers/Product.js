const { Brand } = require("../model/Brand");
const { Category } = require("../model/Category");
const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const categories = await Category.find({
      value: req.body.category,
    });
    const brands = await Brand.find({
      value: req.body.brand,
    });
    if (categories.length === 0) {
      const data = {
        value: req.body.category,
        label: req.body.category,
      };
      const newCategory = new Category(data);
      await newCategory.save();
    }
    if (brands.length === 0) {
      const data = {
        value: req.body.brand,
        label: req.body.brand,
      };
      const newBrand = new Brand(data);
      await newBrand.save();
    }
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let products = Product.find({});
  let totalProducts = Product.find({});
  if (req.query.category) {
    products = products.find({ category: req.query.category });
    totalProducts = totalProducts.find({ category: req.query.category });
  }
  if (req.query.brand) {
    products = products.find({ brand: req.query.brand });
    totalProducts = totalProducts.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    products = products.sort({ [req.query._sort]: req.query._order });
    totalProducts = totalProducts.sort({ [req.query._sort]: req.query._order });
  }
  const count = await totalProducts.count().exec();
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    products = products.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const response = await products.exec();
    res.set("X-Total-Count", count); // this way we can send any value in headers only
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const response = await Product.findById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const response = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (req.body.category) {
      const categories = await Category.find({
        value: req.body.category,
      });
      if (categories.length === 0) {
        const data = {
          value: req.body.category,
          label: req.body.category,
        };
        const newCategory = new Category(data);
        await newCategory.save();
      }
    }
    if (req.body.brand) {
      const brands = await Brand.find({
        value: req.body.brand,
      });

      if (brands.length === 0) {
        const data = {
          value: req.body.brand,
          label: req.body.brand,
        };
        const newBrand = new Brand(data);
        await newBrand.save();
      }
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
