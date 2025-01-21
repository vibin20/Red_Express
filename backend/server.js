const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware to enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Sample user data for authentication
const users = {
  'testuser': 'password123',
  'sandy': 'blackdick',
};

// Sample booking data (would be stored in a database in a real use case)
let bookings = [
  {
    id: 1,
    user: 'testuser',
    destination: 'Tirunelveli',
    date: '2024-10-22',
    busNumber: 'BUS123',
    departureTime: '10:00 AM',
    status: 'Confirmed',
  },
  {
    id: 2,
    user: 'testuser',
    destination: 'Palakad',
    date: '2024-09-15',
    busNumber: 'BUS456',
    departureTime: '2:00 PM',
    status: 'Cancelled',
  },
];

// POST route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  if (users[username] && users[username] === password) {
    res.status(200).json({ message: 'Login successful', token: 'example_token_12345' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Route to get booking history for a user
app.get('/booking-history/:user', (req, res) => {
  const { user } = req.params;
  const userBookings = bookings.filter((booking) => booking.user === user);

  if (userBookings.length > 0) {
    res.status(200).json(userBookings);
  } else {
    res.status(404).json({ message: 'No bookings found for this user.' });
  }
});

// Route to create a new booking
app.post('/book', (req, res) => {
  const { user, destination, date, busNumber, departureTime } = req.body;

  if (!users[user]) {
    return res.status(400).json({ message: 'Invalid user.' });
  }

  const newBooking = {
    id: bookings.length + 1,
    user,
    destination,
    date,
    busNumber,
    departureTime,
    status: 'Confirmed',
  };

  bookings.push(newBooking);
  res.status(201).json({ message: 'Booking successful', booking: newBooking });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
