//REQUIRING MONGOOSE
const mongoose = require("mongoose");

//CREATING PRODUCT SCHEMA
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
  },
});

//MAKING A MODEL FOR PRODUCT SCHEMA !
const Product = mongoose.model("Product", productSchema);

//EXPORTING MODEL FROM THIS FILE
module.exports = Product;
