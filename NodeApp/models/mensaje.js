const getAllMensajes = (pMensajeId) => {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD
<<<<<<< HEAD
        db.query('select * from mensajes where id_emisor = ? OR id_receptor = ?', [pMensajeId, pMensajeId], (err, rows) => {
=======
        db.query('select * from mensajes where id_receptor = ' + pMensajeId, (err, rows) => {
=======
        db.query('select * from mensajes where id_receptor = ?', [pMensajeId], (err, rows) => {
>>>>>>> rama_compartida
            if (err) reject(err);
            resolve(rows);
        });
    });
};
const getByIdEmisor = (pMensajeId) => {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD
        db.query('select * from mensajes where id_emisor = ' + pMensajeId, (err, rows) => {
>>>>>>> parent of 6663d22... Importar jsonwebtoken, moment, inicio de middleware y ruta usuarios
=======
        db.query('select * from mensajes where id_emisor = ?', [pMensajeId], (err, rows) => {
>>>>>>> rama_compartida
            if (err) reject(err);
            resolve(rows);
        });
    });
};
const createMensaje = ({ texto, id_emisor, id_receptor }) => {
    console.log(texto, id_emisor, id_receptor);
    return new Promise((resolve, reject) => {
        db.query('insert into mensajes (texto, id_emisor, id_receptor) values(?, ?, ?)', [texto, id_emisor, id_receptor], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};
const deleteMensaje = (pMensajeId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from mensajes where id = ?', [pMensajeId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};
module.exports = {
    getAllMensajes,
    createMensaje,
    deleteMensaje
}