
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Essential for parsing login/upload data

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Connection Error:", err));


// Routes
app.use('/auth', require('./route/auth'));
app.use('/images', require('./route/images'));

module.exports = app;  
