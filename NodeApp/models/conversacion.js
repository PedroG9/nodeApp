const getAllConversaciones = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from conversaciones where fk_usuario1 = ? or fk_usuario2 = ?', [pUsuarioId, pUsuarioId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const createConversacion = ({ fk_usuario1, fk_usuario2 }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into conversaciones (fk_usuario1, fk_usuario2) values (?, ?)', [fk_usuario1, fk_usuario2], (err, result) => {
            if(err) reject (err);
            resolve (result);
        });
    });
};

const getByIdConv = (pConversacionId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from conversaciones where id = ?', [pConversacionId], (err, rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
}

const deleteByIdConv = (pConversacionId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from conversaciones where id = ?', [pConversacionId], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    getAllConversaciones, createConversacion, getByIdConv, deleteByIdConv
}