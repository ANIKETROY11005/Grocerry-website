//REQUIRING EXPRESS AND PATH
const express = require("express");
const app = express();
const path = require("path");

//USING METHOD OVERRIDE AS FROM A "FORM" IN ejs WE CANNOT MAKE A PUT REQUEST , WE CAN ONLY MAKE A POST REQUEST ..
const methodOverride = require("method-override");

//CONNECTING MONGOOSE!
const mongoose = require("mongoose");

//REQUIRING MODEL PRODUCT
const Product = require("./models/product");

main()
  .then(() => {
    console.log("MONGO CONNECTION OPEN !!");
  })
  .catch((err) => {
    console.log("OH NO CONNECTION ERROR !");
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand");
}
//MONGOOSE CONNECTED

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//USING THE DIFFERENT METHODS WE REQUIRED
app.use(express.urlencoded({ extended: true })); //using express.url encoder to get undefined value from post request body..
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

// ROUTES
app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category: category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({}); // finding all the products data and saving in products variable.
    res.render("products/index", { products, category: "All" }); //connecting to products index page in views and sending the products data in it.
  }
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
  //it takes time to get the required result so we use async and await function...
  const newProduct = new Product(req.body);
  await newProduct.save();
  //   res.send("adding your product .... ");
  res.redirect(`/products/${newProduct._id}`); //redirecting to the new created product page using its id....
  //The request body is undefined we use express.url encoder to get the request body..
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params; //destructuring parameters to get the parameter we need!!
  const product = await Product.findById(id); //finding product from database using id!!
  res.render("products/show", { product }); // passing the product to show.ejs and rendering show.ejs when called products/show..
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log(" App is listening on port 3000.");
});
