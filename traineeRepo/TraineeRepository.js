const {createDatabaseConnection, DB_NAME} = require('../database/config');

function checkTraineeEmailExists(email, callback) {
    const sql = `SELECT COUNT(*) as count from ${DB_NAME}.trainee WHERE email = "${email}"`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error,result[0].count>0);
                }
        
                connection.end();
            });
        }
    });
}
function addTraineeAccount(name,email,password,address,phone,callback){
const sql="INSERT INTO `ngos_courses`.`trainee` (`name`, `email`, `password`, `address`, `phone`) VALUES"+`('${name}', '${email}', '${password}', '${address}', '${phone}');`
createDatabaseConnection((connectError, connection) => {
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
         
                callback(error,result);

            connection.end();
        });
    }
});
}

function checkPasswordDB(email , callback) {
    const sql = "select password from `ngos_courses`.`trainee` where email ="+`'${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);
    
                connection.end();
            });
        }
    });
}

function showNameWithLogIn(email , callback){
    const sql = `select name,id, password from ${DB_NAME}.trainee where email ='${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);

                connection.end();
            });
        }
    });
}


function UpdatePasswordTrainee(id , newPassword , callback){
    const sql = `UPDATE ${DB_NAME}.trainee SET password = '${newPassword}' WHERE (id = '${id}')`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);

                connection.end();
            });
        }
    });
}


function UpdateInformationTrainee(id , name , phone , address , callback){
    const sql = `UPDATE ${DB_NAME}.trainee SET name = '${name}', 
      address = '${address}', phone = '${phone}' WHERE (id = '${id}')`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);

                connection.end();
            });
        }
    });
}

function getAllTrainee(callback) {
const sql = `select id,name,address,phone,email from ngos_courses.trainee`
createDatabaseConnection((connectError, connection) => {
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
         
                callback(error,result);

            connection.end();
        });
    }
});
}


module.exports = {
    checkTraineeEmailExists,addTraineeAccount,checkPasswordDB,showNameWithLogIn,UpdatePasswordTrainee,
    getAllTrainee,UpdateInformationTrainee


};