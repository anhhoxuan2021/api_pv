'use strict';
const User = require('../models/user.model');

// Insert new user
exports.createUser = async (req, res) => {
    try {
        const { first_name, last_name, email,
            password, phone, city, state, zip, address, role, avatar, permission
         } = req.body;
        const newUser = await User.create({ first_name, last_name, email,
            password, phone, city, state, zip, address, role, avatar, permission});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Update existing user by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email,
            password, phone, city, state, zip, address, role, avatar, permission} = req.body;
        const user = await User.findByPk(id);

        if (user) {
            await user.update({first_name, last_name, email,
                password, phone, city, state, zip, address, role, avatar, permission });
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Find one user by ID
exports.findUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

// Find one user by ID
exports.findUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ where: { email: email } });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

// Find all users
exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};
