const createUser = ({ username, password, nombre, apellidos, email, telefono, edad }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into usuarios (username, password, nombre, apellidos, email, telefono, edad) values (?, ?, ?, ?, ?, ?, ?)',
            [username, password, nombre, apellidos, email, telefono, edad],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        )
    });
};

const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where email = ?', [pEmail], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
};

const getById = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where id = ?', [pUsuarioId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    });
}

module.exports = {
    createUser, getByEmail, getById
}