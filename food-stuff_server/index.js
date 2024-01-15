const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()


app.use(cors())
app.use(express.json())

// mongodb config mongoose


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodstuff.jgvytnl.mongodb.net/foodStuff?retryWrites=true&w=majority`).then(console.log("MongoDB connected")).catch((error) => console.log("MongoDB error: " + error))

// routes 
const menuRoutes = require('./api/routes/menuRoutes')
app.use('/menu', menuRoutes)

app.get('/', (req, res) => {
  res.send('Hello FoodStuff!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})