const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/users'); // singular

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.post("/login", async (req, res) => {
  console.log(req.body);

  if (req.body.email && req.body.password) {
    let userData = await User.findOne(req.body).select("-password");

    if (userData) {
      res.send(userData);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});










app.listen(5000, () => console.log("Server running on port 5000"));

