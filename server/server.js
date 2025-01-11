require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/authRoutes');
const adminProductsRouter = require('./routes/admin/products-routes');
const adminOrderRouter = require('./routes/admin/order-routes');
const shopProductsRouter = require('./routes/shop/product-routes');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/addressRoutes');
const shopOrderRouter = require('./routes/shop/orderRoutes');
const shopSearchRouter = require('./routes/shop/searchRoutes');
const shopReviewRouter = require("./routes/shop/reviewRoutes");
const commonFeatureRouter = require("./routes/common/feature-routes");

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MONGODB connected");
  })
  .catch((error) => console.log(error));

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.ORIGIN,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
  credentials: true,
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/auth', authRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    "message": "Hello world"
  });
});

// Export the app as a Vercel serverless function
module.exports = app;
