const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://root:123@cluster0.snvzryj.mongodb.net/symposium_db');

module.exports = mongoose.connection;
