const { createDatabaseConnection, DB_NAME } = require('../database/config');

let state;
function checkNgoEmailExists(email, callback) {
    const sql = `SELECT COUNT(*) as count from ${DB_NAME}.ngos WHERE email = "${email}"`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error, result[0].count > 0);
                }

                // connection.end();
            });
        }
    });
}

function addNgoAccount(name, email, password, callback) {
    const sql = "INSERT INTO `ngos_courses`.`ngos` (`name`, `email`,`password`) VALUES" + `('${name}', '${email}', '${password}');`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {

                callback(error, result);

                // connection.end();
            });
        }
    });

}

function checkPasswordDB(email, callback) {
    const sql = "select password from `ngos_courses`.`ngos` where email =" + `'${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {

                callback(error, result);

                connection.end();
            });
        }
    });
}

function showNameWithLogIn(email, callback) {
    const sql = "select name,id, password from `ngos_courses`.`ngos` where email =" + `'${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {

                callback(error, result);

                // connection.end();
            });
        }
    });
}
////////////////////////////////////////////////////////////////////////////Mohammad-Al-Refai
function UpdateNgo(id, new_name, new_logo, new_website, new_bio, callback) {
    const sql = "select * from `ngos_courses`.`ngos` where id =" + `${id}`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {

            connection.query(sql, (error, result) => {
                if (error) {
                    console.log(error)
                }
                if (result === '') {

                    callback(false)
                    console.log(id, new_name)

                } else {

                    Edit(id, new_name, new_bio, new_website, new_logo, (err, result) => {
                        callback(true)
                        console.log(err)
                    })
                }

            })

        }

    })
}
function Edit(id, new_name, new_bio, new_website, new_logo, callback) {



    if(new_logo==undefined){
        console.log('true')
    let sql = `UPDATE ngos_courses.ngos SET name= '${new_name}',website ='${new_website}', bio= '${new_bio}' WHERE (id = '${id}')`
    createDatabaseConnection((err, connection) => {
        if (err) {
            console.log(err)

        } else {

            connection.query(sql, (error, result) => {
                if (error) {
                    console.log(error)
                } else {

                }
                callback(error, result)

            })
        }
    })


    }else{
        console.log('false')

    let sql = `UPDATE ngos_courses.ngos SET name= '${new_name}', logo= '${new_logo}',website ='${new_website}', bio= '${new_bio}' WHERE (id = '${id}')`
    createDatabaseConnection((err, connection) => {
        if (err) {
            console.log(err)

        } else {

            connection.query(sql, (error, result) => {
                if (error) {
                    console.log(error)
                } else {

                }
                callback(error, result)

            })
        }
    })


}


}

function states(res) {
    res.sendStatus(201)

}
function getNGO(id, callback) {
    sql = `select id,name,bio,email,logo,website from  ngos_courses.ngos where id=${id}`
    createDatabaseConnection((err, connection) => {
        if (err) {
            console.log(err)

        } else {
            connection.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    callback(result)

                }
            })

        }
    })
}
////////////////////////////PUT Password

function checkIdDB(email, callback) {
    const sql = "select id from `ngos_courses`.`ngos` where email =" + `'${email}'`
    createDatabaseConnection((err, connection) => {
        if (err) {
            console.log(err)

        } else {

            connection.query(sql, (error, result) => {
                let id = result[0].id;
                callback(id)
                if (error) {
                    console.log(err)
                }
            })
        }
    })

}

function EditPassword(id, new_password, callback) {
    const sql = "UPDATE `ngos_courses`.`ngos` SET `password` = '" + `${new_password}' WHERE ` + "(`id` = " + `'${id}');`
    createDatabaseConnection((err, connection) => {
        if (err) {
            console.log(err)

        } else {

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    callback(err, true);

                } else {
                    callback(err, true);
                }
            })

        }
    })

}
function GetHAshPassword(id, callback) {
    const sql = "select password from `ngos_courses`.`ngos` where id =" + `'${id}'`
    createDatabaseConnection((err, connection) => {
        if (err) {
            console.log(err)

        } else {

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    callback(err, result);

                }
            })
        }
    })

}
function checkPasswordByEmail(id, email, callback) {
    const sql = "select password from `ngos_courses`.`ngos` where ngos.id =" + `'${id}'` + " and  ngos.email =" + `'${email}'`
    createDatabaseConnection((err, connection) => {
        if (err) {
            console.log(err)

        } else {

            connection.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    callback(err, result);
                }
            })
        }
    })
}
module.exports = {
    checkNgoEmailExists, addNgoAccount, checkPasswordDB, showNameWithLogIn, UpdateNgo, states, getNGO, EditPassword, GetHAshPassword, checkIdDB, checkPasswordByEmail
};