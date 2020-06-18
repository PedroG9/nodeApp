const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Usuario = require('../../models/usuario');

router.get('/', async (req, res) => {
    try {
        const row = await Usuario.getById();
        res.json(row);
    } catch (err) {
        res.json({ error: err.message })

    }
})

// Registrar usuarios
router.post('/', async (req, res) => {
    res.body.password = bcrypt.hashSync(req.password, );
    const result = await Usuario.createUser(req.body);
    if(result['affectedRows'] === 1) {
        res.json({ success: 'Registro correcto' });
    }else {
        res.json({ error: 'Error al registrarse' });
    }
});

// Login usuarios
router.post('/', async (req, res) => {
    const usuario = await Usuario.getByEmail(req.body.email);
    if (usuario) {
        const idem = bcrypt.compareSync(req.body.password, usuario.password);
        if (idem) {
            res.json({ success: 'Correct login', token: createToken(usuario.id) });
        } else {
            res.json({ error: 'Correo electrónico y/o contraseña errónea' });
        }
    } else{
        res.json({ error: 'Fallo en el email y/o password' });
    }
});

function createToken(pUserId) {
    const payload = {
        userId: pUserId,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = router;