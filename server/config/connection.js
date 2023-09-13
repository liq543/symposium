const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qmyc006.mongodb.net/symposium_db`);

module.exports = mongoose.connection;
