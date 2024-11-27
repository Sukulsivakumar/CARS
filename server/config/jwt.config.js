require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiration: process.env.JWT_EXPIRATION || '1h',
};
