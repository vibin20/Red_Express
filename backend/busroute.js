const express = require('express');
const router = express.Router();

// Sample bus data (replace this with actual data fetching logic)
const buses = [
  {
    id: 1,
    busName: 'XYZ Travels',
    source: 'City A',
    destination: 'City B',
    date: '2024-10-12',
    seatsAvailable: 20,
  },
  {
    id: 2,
    busName: 'ABC Express',
    source: 'City A',
    destination: 'City B',
    date: '2024-10-12',
    seatsAvailable: 10,
},
{  
    busName:'A1 Express',
    source:'Chennai',
    destination: 'Madurai',
    date: '2024-10-23',
    seatsAvailable: 20
  },

];

// POST route to search buses
router.post('/search-buses', (req, res) => {
  const { source, destination, date } = req.body;

  // Filter buses based on search criteria
  const availableBuses = buses.filter(bus => 
    bus.source === source && 
    bus.destination === destination && 
    bus.date === date
  );

  if (availableBuses.length > 0) {
    res.status(200).json({ buses: availableBuses });
  } else {
    res.status(404).json({ message: 'No buses available for the selected criteria.' });
  }
});

module.exports = router;
