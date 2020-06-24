const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Usuario = require('../../models/usuario');

router.get('/:id', (req, res) => {
    Usuario.getById(req.params.id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.json({ error: err.message })
    })
});

// Registrar usuarios
router.post('/registro', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await Usuario.createUser(req.body);
    if(result['affectedRows'] === 1) {
        res.json({ success: 'Registro correcto' });
    }else {
        res.json({ error: 'Error al registrarse' });
    }
});

// Login usuarios
router.post('/login', async (req, res) => {
    const usuario = await Usuario.getByEmail(req.body.email);
    if (usuario) {
        //console.log(usuario);
        const idem = bcrypt.compareSync(req.body.password, usuario.password);
        //console.log(idem)
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
};

module.exports = router;