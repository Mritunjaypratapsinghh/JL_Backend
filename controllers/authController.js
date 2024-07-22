const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { validationResult } = require('express-validator');

// Helper function to handle errors
const handleError = (res, error, message = 'Server error') => {
    console.error(message, error);
    res.status(500).json({ error: message });
};

exports.register = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const newUser = new User({ fullName, email, password });
        await newUser.save();

        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();

        res.json({ accessToken, refreshToken, message: "Registration successful" });
    } catch (error) {
        handleError(res, error, 'Registration Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        res.json({ accessToken, refreshToken, message: "Login successful" });
    } catch (error) {
        handleError(res, error, 'Login Error');
    }
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = (req, res) => {
    const { accessToken, refreshToken } = req.user;
    res.json({ accessToken, refreshToken });
};

exports.githubAuth = passport.authenticate('github', { scope: ['user:email'] });

exports.githubAuthCallback = (req, res) => {
    const { accessToken, refreshToken } = req.user;
    res.json({ accessToken, refreshToken });
};
