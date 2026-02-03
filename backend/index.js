const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/e-commerce');

  const productSchema = new mongoose.Schema({});
  const Product = mongoose.model('Product', productSchema);

  const data = await Product.find();
  console.log(data);
};

connectDB();

app.listen(5000);
