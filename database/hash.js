<<<<<<< HEAD
// let bcrypt=require("bcryptjs")
// module.exports.hashPassword =function (password,num,callback){
//     bcrypt.hash(password,num,(err,result)=>{
//     callback(err,result)
//     })
// }
// module.exports.comparePassword=function(password,hash_password,callback){
//     bcrypt.compare(password,hash_password,(err,result)=>{
//     callback(err,result)
//     })
// module.exports.hashPassword =function (password,num,callback){
//     bcrypt.hash(password,num,(err,result)=>{
//     callback(err,result)
//     })
// }
// module.exports.comparePassword=function(password,hash_password,callback){
//     bcrypt.compare(password,hash_password,(err,result)=>{
//     callback(err,result)
//     })
// }
//     }
=======

let bcrypt=require("bcryptjs")
module.exports.hashPassword =function (password,num,callback){
    bcrypt.hash(password,num,(err,result)=>{
    callback(err,result)
    })
}
module.exports.comparePassword=function(password,hash_password,callback){
    bcrypt.compare(password,hash_password,(err,result)=>{
    callback(err,result)
    })

}

>>>>>>> 89ce44ae5eafde1aeed9f61748e4a49069df0b48
