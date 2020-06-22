const jwt = require('jsonwebtoken');
const moment = require('moment');
const multer = require('multer');
const path = require('path');

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

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const uploadImage = multer({
    storage: storage,
    limits: {fileSize: 1000000}
}).single('image');


module.exports = {
    checkToken, uploadImage
}