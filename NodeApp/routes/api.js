const router = require('express').Router();

const apiAlojamientosRouter = require('./api/alojamientos');
const apiUsuariosRouter = require('./api/usuarios');
const apiMensajesRouter = require('./api/mensajes');
const { checkToken } = require('./middlewares');

router.use('/alojamientos', apiAlojamientosRouter);
router.use('/usuarios', checkToken, apiUsuariosRouter);
router.use('/mensajes', apiMensajesRouter);

module.exports = router;