const router = require('express').Router();

const apiAlojamientosRouter = require('./api/alojamientos');
const apiUsuariosRouter = require('./api/usuarios');
const apiMensajesRouter = require('./api/mensajes');
const apiConversacionesRouter = require('./api/conversaciones');
const { checkToken } = require('./middlewares');

router.use('/alojamientos', apiAlojamientosRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/mensajes', apiMensajesRouter);
router.use('/conversaciones', apiConversacionesRouter);

module.exports = router;