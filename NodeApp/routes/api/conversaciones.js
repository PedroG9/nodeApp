const router = require('express').Router();

const Conversacion = require('../../models/conversacion');

router.get('/:id', (req, res) => {
    Conversacion.getAllConversaciones(req.params.id)
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

router.delete('/:idConv', async (req, res) => {
    const conversacion = await Conversacion.getAllConversaciones(req.params.idConv)
    const result = await Conversacion.deleteByIdConv(req.params.idConv);
    if(result['affectedRows'] === 1) {
        res.json({ success: 'Conversacion borrada', conversacion });
    }else {
        res.json({ error: 'Conversacion no eliminada'});
    }
});

module.exports = router;