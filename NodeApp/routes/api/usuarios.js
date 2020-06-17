const router = require('express').Router();

const Usuario = require('../../models/usuario');

router.post('/', async (req, res) => {
    res.body.password = bcrypt.hashSync(req.password, );
    const result = await Usuario.createUser(req.body);
    if(result['affectedRows'] === 1) {
        res.json({ success: 'Registro correcto' });
    }else {
        res.json({ error: 'Error al registrarse' });
    }
});
module.exports = router;