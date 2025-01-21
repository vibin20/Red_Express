const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory cart storage
let cart = [];

// API to add an item to the cart
app.post('/api/cart/add', (req, res) => {
  const { item } = req.body;
  cart.push(item);
  res.status(201).json({ message: 'Item added to cart', cart });
});

// API to get the cart items
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// API to update an item in the cart
app.put('/api/cart/update', (req, res) => {
  const { id, quantity } = req.body; // Assuming item has an 'id' and 'quantity'
  const itemIndex = cart.findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity = quantity;
    return res.json({ message: 'Item updated', cart });
  }

  res.status(404).json({ message: 'Item not found' });
});

// API to remove an item from the cart
app.delete('/api/cart/remove/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id !== id);
  res.json({ message: 'Item removed from cart', cart });
});

// Simulated payment endpoint
app.post('/api/payment', (req, res) => {
  const { amount, cartItems } = req.body;
  // Here you would integrate with a payment gateway for actual payments

  // Simulating a payment process
  if (amount > 0 && cartItems.length > 0) {
    cart = []; // Clear the cart after payment
    return res.json({ message: 'Payment successful', cart });
  }

  res.status(400).json({ message: 'Invalid payment request' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
