const db = require("../db")

const getAllAlojamiento = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from alojamientos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const create = ({ ciudad, tipo_alojamiento, tipo_habitacion, direccion, img, lavanderia, cocina, baño, fecha_inicio, fecha_final, usuario_id }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into alojamientos (ciudad, tipo_alojamiento, tipo_habitacion, direccion, descripcion, img, lavanderia, cocina, baño, fecha_inicio, fecha_final, usuarios_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [ciudad, tipo_alojamiento, tipo_habitacion, direccion, img, lavanderia, cocina, baño, fecha_inicio, fecha_final, usuario_id], 
        (err, result) => {
            if (err) reject (err);
            resolve (result);
        });
    });
};

const getById = (pAlojamientoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from alojamiento where id = ?', [pAlojamientoId], (err, rows) => {
            if(err) reject(err);
            if(rows.length !== 1) reject('El id no existe');
            resolve(rows[0]);
        })
    });
};

const deleteById = (pAlojamientoId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from alojamientos where id = ?', [pAlojamientoId], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

const updateById = (pAlojamientoId, { ciudad, tipo_alojamiento, tipo_habitacion, direccion, img, lavanderia, cocina, baño, fecha_inicio, fecha_final, usuario_id }) => {
    return new Promise((resolve, reject) => {
        db.query (
            'update alojamientos set ciudad = ?, tipo_alojamiento = ?, tipo_habitacion = ??, direccion = ?, img = ?, lavanderia = ?, cocina = ?, baño = ?, fecha_inicio = ?, fecha_final = ?, usuario_id = ?', 
            [ciudad, tipo_alojamiento, tipo_habitacion, direccion, img, lavanderia, cocina, baño, fecha_inicio, fecha_final, usuario_id], 
            (err, result) => {
                if (err) reject(err);
                resolve (result);
            }
        )
    })
}

module.exports = {
    getAllAlojamiento, create, getById, deleteById, updateById
}