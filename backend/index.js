const express = require('express');
// const mongoose = require('mongoose');
require('./db/config');
const users = require('./db/users');
const app = express();

app.post("/register", (req, res) => {
  res.send("Api is working");
});


app.listen(5000);
