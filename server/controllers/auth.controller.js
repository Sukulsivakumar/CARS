const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const jwtConfig = require('../config/jwt.config');
const Auth = require('../models/auth.model');

// Register a new user using Sequelize
exports.register = async (req, res, next) => {
    const { email,username, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password);

        // Create new user with Sequelize
        const newUser = await Auth.create({
            email,
            username,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Email or UserID already exists' });
        } else {
            next(err);
        }
    }
};

// Login user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Fetch user by email
        const user = await Auth.findOne({ where: { email } }); 
        if (!user) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }

        const validPassword = await comparePassword(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, { expiresIn: jwtConfig.expiration });
        res.cookie('token', token, { secure: true, sameSite: 'strict' });
        res.json({ message: 'Logged in successfully', user: { id: user.id, firstname: user.firstname, email: user.email } });
    } catch (err) {
        next(err);
    }
};

// Logout user
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};
