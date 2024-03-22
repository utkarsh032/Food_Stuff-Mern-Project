const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'food-stuff_client/dist')));

// MongoDB Connection
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodstuff.jgvytnl.mongodb.net/foodStuff?retryWrites=true&w=majority`)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// JWT Authentication Endpoint
app.post('/jwt', (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: '1hr',
  });
  res.send({ token });
});

// Routes
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);

// Stripe Payment Endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { price } = req.body;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
