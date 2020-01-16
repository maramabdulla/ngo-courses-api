const {createDatabaseConnection, DB_NAME} = require('../database/config');


function checkNgoEmailExists(email, callback) {
    const sql = `SELECT COUNT(*) as count from ${DB_NAME}.ngos WHERE email = "${email}"`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error,result[0].count>0);
                }
        
                // connection.end();
            });
        }
    });
}

function addNgoAccount(name,email,password,callback){
const sql="INSERT INTO `ngos_courses`.`ngos` (`name`, `email`,`password`) VALUES"+`('${name}', '${email}', '${password}');`
createDatabaseConnection((connectError, connection) => {
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
            
                callback(error,result);
        
            // connection.end();
        });
    }
});

}

function checkPasswordDB(email , callback) {
    const sql = "select password from `ngos_courses`.`ngos` where email ="+`'${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                
                    callback(error,result);
            
                // connection.end();
            });
        }
    });
}

function showNameWithLogIn(email , callback){
    const sql = "select name,id, password from `ngos_courses`.`ngos` where email ="+`'${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                
                    callback(error,result);
            
                // connection.end();
            });
        }
    });
}

module.exports = {
    checkNgoEmailExists,addNgoAccount,checkPasswordDB,showNameWithLogIn
};