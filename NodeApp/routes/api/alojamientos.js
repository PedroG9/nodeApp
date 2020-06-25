const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'public/uploads'})
const { uploadImage } = require('./middlewares');
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

// Imagen
router.post('/', upload.single('imagen') , (req, res) => {
    console.log(req.file);
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'Imagen no subida';
            return res.send(err);
        }
        console.log(req.file);
        res.send('Imagen subida');
    });
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
    const result = await Alojamiento.updateById(req.params.idAlojamiento, req.body);
    console.log(result);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Alojamiento actualizado' });
    }else {
        res.json({ error: 'Alojamiento no actualizado' });
    }
})

module.exports = router;