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

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    // cart using email
    app.get('/carts', async (req, res) => {
      const email = req.query.email
      const filter = { email: email }
      const result = await cartCollections.find(filter).toArray()
      res.send(result)
    })

    // get specific cart
    app.get('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await cartCollections.findOne(filter);
      res.send(result);
    })

    // delete item
    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await cartCollections.deleteOne(filter);
      res.send(result);
    })

    // update carts quantity
    app.put("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const { quantity } = req.body
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10)
        },
      }

      const result = await cartCollections.updateOne(filter, updateDoc, options);
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