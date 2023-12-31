const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('FoodStuff Server!')
})

// mongodb.connect

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6w7eemv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const menuCollections = client.db("foodStuff_client").collection('menu')
    const cartCollections = client.db("foodStuff_client").collection('cartItems')

    // menu items

    app.get('/menu', async (req, res) => {
      const result = await menuCollections.find().toArray()
      res.send(result)
    })

    // cart items
    app.post('/carts', async (req, res) => {
      const cartItem = req.body
      const result = await cartCollections.insertOne(cartItem)
      res.send(result)
    })

    await client.db('admin').command({ ping: 1 })
    console.log("MongoDB server connected successfully!");
  } finally {

  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})