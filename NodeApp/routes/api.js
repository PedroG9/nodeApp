const router = require('express').Router();

const apiAlojamientosRouter = require('./api/alojamientos');

router.use('/alojamientos', apiAlojamientosRouter);

module.exports = router;