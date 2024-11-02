const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Corrected import
const cors = require('cors');
const authRouter = require('./routes/auth/authRoutes');

// Connect to MongoDB
mongoose.connect('mongodb+srv://arbinniroula21:Hello123@cluster0.er7tx.mongodb.net/')
    .then(() => {
        console.log("MONGODB connected");
    })
    .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
    cors({
        origin: 'http://localhost:5173', // Removed trailing slash
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            'Content-Type',
            'Authorization', // Removed extra space
            'Cache-Control',
            'Expires',
            'Pragma'
        ]
    })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
