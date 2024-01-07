const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
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

const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
