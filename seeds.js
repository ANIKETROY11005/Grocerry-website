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

//INSERTING PRODUCTS USING INSERT MANY METHOD!
const seedProducts = [
  {
    name: "GrapeFruit",
    price: 1.99,
    category: "fruit",
  },
  {
    name: "Carrot",
    price: 1.0,
    category: "vegetable",
  },

  {
    name: "Melon",
    price: 4.99,
    category: "fruit",
  },

  {
    name: "Orange",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Tomato",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Goat Milk",
    price: 2.69,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

//INSERTED INTO DATABASE
