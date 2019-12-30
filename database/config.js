const mysql = require('mysql');
const DB_NAME = 'ngos_courses';

function createDatabaseConnection(callback) {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '123',
        database: DB_NAME,
        port: 3306
    });

    connection.connect(error => {
        if (callback) {
            callback(error, connection)
        }
    });
}

module.exports = {
    createDatabaseConnection,
    DB_NAME
};