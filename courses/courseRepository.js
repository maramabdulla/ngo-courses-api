const {createDatabaseConnection, DB_NAME} = require('../database/config');


function AddNewCourses(title,dateBegin,dateEnd,locations,range_weight,desc,trinername,callback) {
    let sql=' INSERT INTO `ngos_courses`.`courses (`title`,`start-date`,`end-datel`,`location`,`number_of_seats`,`description`,`trinername` ) VALUES ('+ `'${title}'`+","+`'${dateBegin}'`+","+`'${dateEnd}'`+","+`'${locations}'`+","+`'${range_weight}'`+","+`'${desc}'`+ `'${trinername}'`+')';
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error,SpeechRecognitionResult);
                }
        
                connection.end();
            });
        }
    });
}
 
function getAllCourses(callback){
    let sql=`SELECT * from ${DB_NAME}.courses`;

    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error,result);
                }
        
                connection.end();
            });
        }
    });
}
function deleteCourse(id , callback){
    let sql='DELETE FROM ngos_courses.courses WHERE id='+id+' ';
   
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error,result);
                }
        
                connection.end();
            });
        }
    });
}

function InsertCT(id_course , id_traines , callback) {
const sql = `INSERT INTO ngos_courses.courses_traines (id_course,id_traines) VALUES ('${id_course}', '${id_traines}')`;
createDatabaseConnection((connectError, connection) => {
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
            if (callback) {
                callback(error,result);
            }
            connection.end();
        });
    }
});
}

module.exports = {
    AddNewCourses,getAllCourses,deleteCourse,InsertCT
};
// ${trinername}