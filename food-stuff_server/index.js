const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
require('dotenv').config()

app.use(cors());
app.use(express.json());

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodstuff.jgvytnl.mongodb.net/foodStuff?retryWrites=true&w=majority`
  )
  .then(
    console.log("MongoDB Connected Successfully!")
  )
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: '1hr'
  })
  res.send({ token });
})


const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const { decode } = require("punycode");
const { request } = require("http");
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)

app.get("/", (req, res) => {
  res.send("Hello FOOdStuff!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
