const router = require('express').Router();

const Conversacion = require('../../models/conversacion');



router.get('/:idUsuario', (req, res) => {
    Conversacion.getAllConversaciones(req.params.idUsuario)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.json({ err: err.message })
    })
});



router.post('/', async (req, res) => {
    const result = await Conversacion.createConversacion(req.body);
    res.json(result)
});



router.delete('/:idConversacion', async (req, res) => {
    const conversacion = await Conversacion.getByIdConv(req.params.idConversacion)
    const result = await Conversacion.deleteByIdConv(req.params.idConversacion);
    console.log(result);
    if(result['affectedRows'] === 1) {
        res.json({ success: 'Conversacion borrada', conversacion: conversacion });
    }else {
        res.json({ error: 'Conversacion no eliminada'});
    }
}); 

module.exports = router;