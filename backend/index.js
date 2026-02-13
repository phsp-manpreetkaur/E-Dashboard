const express = require('express');
const cors = require('cors');
require('./db/config');
const Users = require('./db/users');
const Products = require('./db/product');

const jwt = require('jsonwebtoken');
const JWTKey = "e-comm";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", verifyToken, async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  jwt.sign({ result }, JWTKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went wrong" });
    } else {
      res.send({ result, auth: token });
    }
  });
});   // ✅ Properly closed here


app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await Users.findOne(req.body).select("-password");

    if (user) {
      jwt.sign({ user }, JWTKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something went wrong" });
        } else {
          res.send({ user, auth: token });
        }
      });
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "No User found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Products(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken , async (req, res) => {
  let products = await Products.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products found" });
  }
});

app.delete("/products/:id", verifyToken, async (req, res) => {
  const result = await Products.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/products/:id", verifyToken, async (req, res) => {
  let result = await Products.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Product found" });
  }
});

app.put("/products/:id", verifyToken, async (req, res) => {
  let result = await Products.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key",verifyToken, async (req, res) => {
  let result = await Products.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } }
    ]
  });
  res.send(result);
});


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1];  // remove "Bearer"

    jwt.verify(token, JWTKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });

  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}


app.listen(5000);
