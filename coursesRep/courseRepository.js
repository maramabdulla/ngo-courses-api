const { createDatabaseConnection, DB_NAME } = require('../database/config');
// ' INSERT INTO ngos_courses.courses (title,start-date,end-datel,location,number_of_seats,description ) VALUES ('+
//      `'${title}'`+","+`'${dateBegin}'`+","+`'${dateEnd}'`+","+`'${locations}'`+","+`'${range_weight}'`+","+`'${desc}'`+ `'${trinername}'`+')'

function AddNewCourses(title, dateBegin, dateEnd, locations, range_weight, desc,trainerName, callback) {
    let sql = `INSERT INTO ${DB_NAME}.courses (title,start_date,end_datel,location,number_of_seats,description,trainer ) VALUES(
'${title}','${dateBegin}','${dateEnd}','${locations}','${range_weight}','${desc}','${trainerName}')`;

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

function getAllCourses(callback) {
    let sql = `SELECT * from ${DB_NAME}.courses`;

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
function deleteCourse(id, callback) {
    let sql = `DELETE FROM ${DB_NAME}.courses WHERE id = ${id}`;

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
function getTrainerName(callback){
    let sql=`select name from ${DB_NAME}.trainers`;
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
function updataInfromationCOurses(id,title, dateBegin, dateEnd, locations, range_weight, desc,trainer, callback){
    let sql=` UPDATE INTO ${DB_NAME}.courses SET (title,start-date,end-datel,location,number_of_seats,description,trainer ) VALUES(
        '${title}','${dateBegin}','${dateEnd}','${locations}','${range_weight}','${desc}','${trainer}') WHERE id= `+id+``;
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
function getOneCourse(id,callback){
    let sql = `SELECT * from ${DB_NAME}.courses WHERE id= `+id+` `;
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
function SearchCourse(title,callback){
    // let sql='DELETE FROM ngos_courses.courses WHERE id='+id+' ';
    let sql=`SELECT * FROM ${DB_NAME}.courses WHERE title LIKE '${title}' `;
     createDatabaseConnection((connectError, connection) => {
         if (connectError) {
            console.log(connectError);
             callback(connectError, null);
         } else {
             connection.query(sql, (error, result) => {

                 if (callback) {
                     console.log(result);
                     callback(error,result);
                 }
                 connection.end();
             });
         }
     });
 
 }
 function getAllCoursesNgo( callback) {
   const sql = `SELECT * FROM ${DB_NAME}.courses INNER JOIN ${DB_NAME}.ngos on ${DB_NAME}.courses.id_ngo = ${DB_NAME}.ngos.id`;
    //const sql = `SELECT * FROM ${DB_NAME}.courses FULL OUTER JOIN ${DB_NAME}.ngos on ${DB_NAME}.courses.'${id_ngo}' = ${DB_NAME}.ngos.'${id}' ORDER BY ${DB_NAME}.courses.title `;
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
function GetRegisteredTrainees(callback){
    let sql=`SELECT * FROM ${DB_NAME}.courses INNER JOIN ${DB_NAME}.courses_trainee on ${DB_NAME}.courses.id= ${DB_NAME}.courses_trainee.id_course INNER JOIN ${DB_NAME}.trainee on ${DB_NAME}.courses_trainee.id_trainee=${DB_NAME}.trainee.id;`
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
function registerTrainee(id_course,callback){
    const sql= `SELECT * FROM ${DB_NAME}.courses INNER JOIN ${DB_NAME}.courses_trainee on ${DB_NAME}.courses.id= ${DB_NAME}.courses_trainee.id_course INNER JOIN ${DB_NAME}.trainee on ${DB_NAME}.courses_trainee.id_trainee=${DB_NAME}.trainee.id WHERE ngos_courses.courses.id ='${id_course}';`
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

function UNRegisterTrainee(id_trainee,callback){
    const sql= `DELETE FROM ${DB_NAME}.courses_trainee WHERE id_trainee in (
        SELECT * FROM ${DB_NAME}.courses INNER JOIN ${DB_NAME}.courses_trainee 
        on ${DB_NAME}.courses.id= ${DB_NAME}.courses_trainee.id_course 
        INNER JOIN ${DB_NAME}.trainee 
        on ${DB_NAME}.courses_trainee.id_trainee=${DB_NAME}.trainee.id 
        WHERE ngos_courses.courses_trainee.id_trainee ='${id_trainee}
    ) ;`
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
    AddNewCourses, getAllCourses, deleteCourse,getTrainerName,updataInfromationCOurses,getOneCourse,SearchCourse,getAllCoursesNgo,registerTrainee,UNRegisterTrainee,GetRegisteredTrainees
};
// ${trinername}
//DELETE FROM ngos_courses.courses
//  WHERE id in (
//  SELECT ngos_courses.courses.id
//  FROM ngos_courses.courses
//  INNER JOIN ngos_courses.courses_trainee
//  ON ngos_courses.courses.id = ngos_courses.courses_trainee.id_course
//  INNER JOIN ngos_courses.trainee
//  ON ngos_courses.trainee.id = ngos_courses.courses_trainee.id_trainee
//  WHERE ngos_courses.courses_trainee.id_trainee=2
//  )
//  ;