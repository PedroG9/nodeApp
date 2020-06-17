const router = require('express').Router();

const Mensaje = require('../../models/mensaje');

//Recuperamos todos los mensajes

router.get('/:id_receptor', (req, res) => {
    Mensaje.getByIdReceptor(req.params.id_receptor)
        .then(rows => {
            res.render('mensajes', { mensajes: rows })
        })
        .catch(err => {
            res.render({ error: err.message })
        })
})

router.get('/:id_emisor', (req, res) => {
    Mensaje.getByIdEmisor(req.params.id_emisor)
        .then(rows => {
            res.render('mensajes', { mensajes: rows })
        })
        .catch(err => {
            res.render({ error: err.message })
        })
})

//Creamos un nuevo mensaje.
router.post('/', async (req, res) => {
    const result = await Mensaje.createMensaje(req.body);
    res.json(result)
})

//Borrar un mensaje.
router.delete('/:idMensaje', async (req, res) => {
    const mensaje = await Mensaje.getById(req.params.idMensaje);

    const result = await Mensaje.deleteById(req.params.idMensaje);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Mensaje borrado', mensaje });
    } else {
        res.json({ error: 'Mensaje no eliminado' });
    }
});



module.exports = router;