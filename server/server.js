require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/authRoutes');
const adminProductsRouter=require('./routes/admin/products-routes')
const shopProductsRouter=require('./routes/shop/product-routes')
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
''
    .then(() => {
        console.log("MONGODB connected");
    })
    .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
    cors({
        origin: 'http://localhost:5173', // Frontend URL without trailing slash
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true // Allows cookies and credentials to be sent
    })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/admin/products", adminProductsRouter);
// Routes
app.use('/api/auth', authRouter);
app.use('/api/shop/products',shopProductsRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
