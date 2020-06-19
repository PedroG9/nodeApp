const jwt = require('jsonwebtoken');
const moment = require('mmoment');

const checkToken = (req, res, next) => {
    if (!req.headers['user-token']) {
        return res.json({ error: 'Debes incluir el token dentro de la cabecera' });
    }

    const userToken = req.headers['user-token'];
    console.log(userToken);
    let payload = {};
    try {
        payload = jwt.decode(token, process.env.TOKEN_KEY)
    } catch (err) {
        return res.json({
            error: 'Invalid token'
        });
    }

    if (moment().unix() > payload.expiredAt) {
        return res.json({ error: 'Expired token' });
    }

    req.payload = payload;

    next();
};


module.exports = {
    checkToken
}