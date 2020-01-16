const { createDatabaseConnection, DB_NAME } = require('../database/config');


function addtrainers(){

    let trainerName = req.body.name;
    let trainerEmail = req.body.email;
    let trainerNumber = req.body.num;
    let traineraddress = req.body.address;
    let trainerphoto = req.body.photo; 
    let trainerbio = req.body.bio;
    let base64Image = trainerphoto.split(';base64,').pop();
    const
    imgpath = "/imeges/trainers/"+trainerEmail+trainerNumber+".png",
    fullPath = process.cwd() + imgpath

;

    fs.writeFile(fullPath, base64Image, {encoding: 'base64'}, function(err) {
        console.log(fullPath);
    });

    sql = `INSERT INTO ${DB_NAME}.trainers  ( 'name','picture', 'email', 'mobile', 'address', 'short_bio') VALUES ( '${trainerName}', '${imgpath}', '${trainerEmail}', '${trainerNumber} ', '${traineraddress}', '${trainerbio}' ) ;` 

}



function getOneTrainer(id,callback){
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





module.exports = {
    getOneTrainer,getALLtrainer,deleteTrainer,addtrainers
};