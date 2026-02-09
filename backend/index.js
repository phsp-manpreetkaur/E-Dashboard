const express = require('express');
const cors = require('cors');
require('./db/config');
const Users = require('./db/users');
const Products = require('./db/product');

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "No User found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Products(req.body);
  let result = await product.save();
  res.send(result);
});


app.get("/products", async (req, res) => {
  let products = await Products.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products found" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const result = await Products.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/products/:id", async (req, res) => {
  let result = await Products.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Product found" });
  }
}); 





app.listen(5000);
