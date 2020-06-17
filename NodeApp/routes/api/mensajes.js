const router = require('express').Router();

const Mensaje = require('../../models/mensaje');

//Recuperamos todos los mensajes

router.get('/:id', (req, res) => {
    Mensaje.getAllMensajes(req.params.id)
        .then(rows => {
            res.json(rows)
        })
        .catch(err => {
            res.json({ error: err.message })
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