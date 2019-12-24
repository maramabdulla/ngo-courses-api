const {createDatabaseConnection, DB_NAME} = require('../database/config');

function checkNgoEmailExists(email, callback) {
    const sql = `SELECT COUNT(*) as count from ${DB_NAME}.ngos WHERE email = ${email}`;

    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                console.log(result);
                if (callback) {
                    callback(error, result[0].count > 0);
                }
        
                connection.end();
            });
        }
    });
}

module.exports = {
    checkNgoEmailExists
};