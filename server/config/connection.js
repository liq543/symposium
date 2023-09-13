const mongoose = require('mongoose');
const dotenv = require('dotenv');

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://root:123@cluster0.snvzryj.mongodb.net/symposium_db');
=======
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.qmyc006.mongodb.net/symposium_db`);
>>>>>>> ee9bac15d1203d4baae6950dfec4242257310fca

module.exports = mongoose.connection;
