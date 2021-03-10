const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/config');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_SECRET, { expiresIn: '5min' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '1hour' });

    return {
        access_token,
        refresh_token
    };
};
