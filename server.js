// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON data

// In-memory database (for simplicity)
const orders = [];

// Route to handle order submissions
app.post('/submit-order', (req, res) => {
    const order = req.body;

    // Validate the received data
    if (!order.productName || !order.quantity || !order.customerName || !order.address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Add the order to the in-memory database
    orders.push(order);

    console.log('Order received:', order);

    // Respond to the client
    res.status(201).json({ message: 'Order submitted successfully!', order });
});

// Route to fetch all orders
app.get('/orders', (req, res) => {
    res.status(200).json({ orders });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
