const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://root:friends@cluster0.qmyc006.mongodb.net/symposium');

module.exports = mongoose.connection;
