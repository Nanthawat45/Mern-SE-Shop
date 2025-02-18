const ProductModel = require("../model/Product");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createProduct = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Create a new product"
    #swagger.description = 'Endpoint to create a new product'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['file'] = {
       in:'formData',
       type:'file',
       required:true,
       description:'Image to upload to Firebase Storage and get its url'
    }
    #swagger.requestBody = {
       required:true,
       content:{
         "multipart/form-data":{
           schema:{
             $ref:"#components/schemas/NewProduct"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Product created successfully"
    }
   */
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const firebaseUrl = req.file.firebaseUrl;
  const { name, description, category, price } = req.body;
  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const ProductDoc = await ProductModel.create({
      name,
      description,
      category,
      image: firebaseUrl,
      price,
    });
    res.json(ProductDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to create Product" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const Product = await ProductModel.find();
    //SELECT * FROM Product WHERE Product.author =USER._id
    if (!Product) {
      return res.status(404).json({ message: "No Product found" });
    }
    res.json(Product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const ProductDoc = await ProductModel.findById(id);
    if (!ProductDoc) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(ProductDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const ProductDoc = await ProductModel.findById(id);
    if (!ProductDoc) {
      res.status(404).send({ message: "You can not delete Product" });
      return;
    }
    await ProductDoc.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "delete Product error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "Product not provided" });

  try {
    const ProductDoc = await ProductModel.findById(id);
    if (!ProductDoc) {
      res.status(404).send({ message: "You can not update Product" });
      return;
    }

    const { name, category, description, price } = req.body;
    if (!name || !category || !description || !price) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    ProductDoc.name = name;
    ProductDoc.category = category;
    ProductDoc.description = description;
    ProductDoc.price = price;
    if (req.file) {
      const path = req.file.firebaseUrl;
      ProductDoc.image = path;
    }
    await ProductDoc.save();
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "update Product error" });
  }
};

exports.getProductByAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const ProductDoc = await ProductModel.find({ author: id }).populate(
      "author",
      ["username"]
    );
    if (!ProductDoc) {
      return res.status(404).send({ message: "author not found" });
    }
    res.json(ProductDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message || "Internal server error" });
  }
};