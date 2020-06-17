const router = require('express').Router();

const apiAlojamientosRouter = require('./api/alojamientos');
const apiUsuariosRouter = require('./api/usuarios');
const apiMensajesRouter = require('./api/mensajes');

router.use('/alojamientos', apiAlojamientosRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/mensajes', apiMensajesRouter);

module.exports = router;