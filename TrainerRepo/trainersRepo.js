const { createDatabaseConnection, DB_NAME } = require('../database/config');


function addtrainers(trainerName,imgpath,trainerEmail,trainerNumber,traineraddress,trainerbio ,callback,id){


    const sql = "INSERT INTO trainers  ( `name`,`picture`, `email`, `mobile`, `address`, `short_bio`) VALUES ( '" +trainerName +"', '" + imgpath +"', '" + trainerEmail+"', '" + trainerNumber + "', '" + traineraddress + "', '" + trainerbio + "' ) ;" ;


    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error, result);
                }

                connection.end();
            });
        }
    });
}



function getOnetrainer(id,callback){
    let sql = `SELECT * from ${DB_NAME}.trainers WHERE id= `+id+` `;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error, result);
                }

                connection.end();
            });
        }
    });
}

function getALLtrainer(callback){

    sql = `SELECT * FROM ${DB_NAME}.trainers `


    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error, result);
                }

                connection.end();
            });
        }
    });

}

function deleteTrainer(id,callback){

    let sql = `DELETE FROM ${DB_NAME}.trainers WHERE id = ${id}`;


    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error, result);
                }

                connection.end();
            });
        }
    });

}

function edittrainers(trainerName,imgpath,trainerEmail,trainerNumber,traineraddress,trainerbio,id ,callback){
    let params = `name='${trainerName}',email='${trainerEmail}',mobile='${trainerNumber}',address='${traineraddress}',short_bio='${trainerbio}'`;
    
    if (imgpath !== '') {
        params += `,picture='${imgpath}'`
    }

    let sql=`UPDATE ${DB_NAME}.trainers SET ${params} WHERE
    id= `+id+`;`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
           
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error, result);
                }

                connection.end();
            });
        }
    });
    
}





module.exports = {
    getALLtrainer,getOnetrainer,deleteTrainer,addtrainers,edittrainers
};