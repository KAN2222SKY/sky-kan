const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.send({ token });
});

router.get('/loyalty', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const { userId } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(userId);
    res.send({ loyaltyPoints: user.loyaltyPoints });
});

module.exports = router;
