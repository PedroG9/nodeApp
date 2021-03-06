const router = require('express').Router();

const Alojamiento = require('../../models/alojamiento');

// Recuperar todos los alojamientos
router.get('/', (req, res) => {
    Alojamiento.getAllAlojamiento()
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.json({ error: err.message })
        });
});

// Crear nuevo alojamiento en la base de datos
router.post('/', async (req, res) => {
    const result = await Alojamiento.create(req.body);
    if(result['affectedRows'] === 1) {
        const alojamiento = await Alojamiento.getById(result['insertId']);
        res.json({ success: 'Alojamiento creado', alojamiento});
    } else {
        res.json({ error: 'Alojamiento no creado' });
    }
    
});

// Borrar alojamiento
router.delete('/:idAlojamiento', async (req, res) => {
    const alojamiento = await Alojamiento.getById(req.params.idAlojamiento);

    const result = await Alojamiento.deleteById(req.params.idAlojamiento);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Alojamiento borrado', alojamiento });
    } else {
        res.json({ error: 'Alojamiento no eliminado' });
    }
});

// Editar alojamiento
router.put('/:idAlojamiento', async (req, res) => {
    const result = await Alojamiento.updateById(req.params.idCliente, req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Alojamiento actualizado' });
    }else {
        res.json({ error: 'Alojamiento no actualizado' });
    }
})

module.exports = router;