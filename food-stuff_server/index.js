const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

const jwt = require('jsonwebtoken');


app.use(cors())
app.use(express.json())

// mongodb config mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodstuff.jgvytnl.mongodb.net/foodStuff?retryWrites=true&w=majority`).then(console.log("MongoDB connected")).catch((error) => console.log("MongoDB error: " + error))

// jwt authentication
app.post('/jwt', async (req, res) => {
  const user = req.body
  const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: '1hr'
  })
  res.send({ token })
})



// routes 
const menuRoutes = require('./api/routes/menuRoutes')
const cartRoutes = require('./api/routes/cartRoutes')
const userRoutes = require('./api/routes/userRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello FoodStuff!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})