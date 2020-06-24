const getAllMensajes = (pMensajeId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from mensajes where fk_conversacion = ?', [pMensajeId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const createMensaje = ({ texto, fk_conversacion, fk_emisor }) => {
    //console.log(texto, id_emisor, id_receptor);
    return new Promise((resolve, reject) => {
        db.query('insert into mensajes (texto, fk_conversacion, fk_emisor) values(?, ?, ?)', [texto, fk_conversacion, fk_emisor], (err, result) => {
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