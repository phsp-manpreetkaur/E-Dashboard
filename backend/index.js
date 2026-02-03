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
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

