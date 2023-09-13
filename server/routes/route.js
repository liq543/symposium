const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Your Mongoose User model
const { signToken } = require('../utils/auth.js'); // Import the signToken function from auth.js
const router = express.Router();




router.post('/signup', async (req, res) => {
    try {
        const user = new User({ email: req.body.email, password: req.body.password, username: req.body.email });
        await user.save();

        // Generate a JWT token here
        const token = signToken(user);

        res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            // Generate a JWT token here
            const token = signToken(user);

            res.status(200).send({ message: 'Login successful', token });
        } else {
            res.status(400).send({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;