const router = require('express').Router();

const apiAlojamientosRouter = require('./api/alojamientos');
const apiUsuariosRouter = require('./api/usuarios');

router.use('/alojamientos', apiAlojamientosRouter);
router.use('/usuarios', apiUsuariosRouter);

module.exports = router;