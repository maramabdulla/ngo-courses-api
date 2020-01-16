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

// function UpdateNgo(id, new_name,new_logo,new_website,new_bio, callback) {
//     const sql = "select * from `ngos_courses`.`ngos` where email =" + `'${id}'`
//     connection.query(sql, (error, result) => {
//         if (result.length < 0) {
//             callback(false)
//         } else {
//             EditName(id, new_name, result => {
//                 callback(true)
//             })
//             EditLogo(id, new_logo, result => {
//                 callback(true)
//             })
//             EditWebsite(id, new_website, result => {
//                 callback(true)
//             })
//             EditBio(id, new_bio, result => {
//                 callback(true)
//             })


//         }

//     })

// }
// function EditName(id, new_name, callback) {
//     const sql = "UPDATE `ngos_courses`.`ngos` SET `name` = " + `"${new_name}"` + `WHERE` + "(`id` " + `= '${id}');`
//     createDatabaseConnection((err,connection)=>{
//         if(err){
//             console.log(err)
//             }else{
    
//     connection.query(sql, (error, result) => {
//         callback(error, result);

//     })
// }
// })
// }


// function EditBio(id, new_bio, callback) {
//     const sql = "UPDATE `ngos_courses`.`ngos` SET `bio` = " + `"${new_bio}"` + `WHERE` + "(`id` " + `= '${id}');`
//     createDatabaseConnection((err,connection)=>{
//         if(err){
//             console.log(err)
//             }else{
    
//     connection.query(sql, (error, result) => {
//         callback(error, result);

//     })
// }
// })
    
// }
// ////////////////
// //#editLogo


// function EditLogo(id, new_logo, callback) {
//     const sql = "UPDATE `ngos_courses`.`ngos` SET `logo` = " + `"${new_logo}"` + `WHERE` + "(`id` " + `= '${id}');`
//     createDatabaseConnection((err,connection)=>{
//         if(err){
//             console.log(err)
//             }else{
    
//     connection.query(sql, (error, result) => {
//         callback(error, result);

//     })
// }
// })
// }
// ////////////////

// //#editWebsite
// function EditWebsite(id, new_website, callback) {
//     const sql = "UPDATE `ngos_courses`.`ngos` SET `website` = " + `"${new_website}"` + `WHERE` + "(`id` " + `= '${id}');`
//     createDatabaseConnection((err,connection)=>{
//         if(err){
//             console.log(err)
//             }else{
    
//     connection.query(sql, (error, result) => {
//         callback(error, result);

//     })
// }


// })
// }
module.exports = {
    checkNgoEmailExists,addNgoAccount,checkPasswordDB,showNameWithLogIn
};