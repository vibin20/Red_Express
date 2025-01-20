const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Sample cart data
let cartItems = [
  { id: 1, name: 'Pizza', price: 300, quantity: 2 },
  { id: 2, name: 'Burger', price: 150, quantity: 1 },
];

// Route to get the cart items
app.get('/api/cart', (req, res) => {
  res.status(200).json({ items: cartItems });
});

// Route to update item quantity
app.post('/api/cart', (req, res) => {
  const { itemId, quantity } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than 0' });
  }

  const item = cartItems.find((item) => item.id === itemId);
  if (item) {
    item.quantity = quantity;
    return res.status(200).json(item);
  }

  res.status(404).json({ message: 'Item not found' });
});

// Route to remove item from cart
app.delete('/api/cart', (req, res) => {
  const { itemId } = req.body;

  const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    return res.status(200).json({ message: 'Item removed' });
  }

  res.status(404).json({ message: 'Item not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
