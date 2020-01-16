const
    express = require("express"),
    bcrypt = require("../database/hash"),
    jwt = require("jsonwebtoken"),
    router = express.Router(),
    {checkNgoEmailExists,addNgoAccount,checkPasswordDB,showNameWithLogIn} = require('../ngo/NgoRepository'),
    routeBase = '/ngo'
;
//.....................................
const key = "iwearft54aw7eg6yq3urt4jy4567idfhjgkuiyut";
router.post(routeBase + '/register', (req, res) => {
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    const checkName = /^[a-z]|[0-9]/i;
    const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
    const checkPassword = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
if(checkName.test(name) == true && checkEmail.test(email) == true && checkPassword.test(password) == true) {
    checkNgoEmailExists(email, (EmailDidNotExisit, EmailExisted) => {
        if(EmailExisted==0){
            bcrypt.hashPassword(password,8,(HashingDidNotWork,HashingPasswordWorked)=>{
                if(HashingDidNotWork){
                    res.status(500);
                }else{
                    addNgoAccount(name,email,HashingPasswordWorked,(addNgoAccountFiled,addNgoAccountSuccessed)=>{
                        console.log(addNgoAccountSuccessed)
                        if(addNgoAccountFiled){
                            console.log(addNgoAccountFiled)
                            res.status(500);
                        }else{   
                            let id = addNgoAccountSuccessed.insertId
                            let tokenSignUp = jwt.sign({id:id,email:email,password:HashingPasswordWorked},key)
                           res.status(201).send({id:id,token:tokenSignUp}); 
                        }
                       
                    });
                }
            })
        }else{
            res.send({status:226})
        }
    })
}else{

    res.status(400)
}
});
//...........................
router.post(routeBase + '/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    checkPasswordDB(email,(err,FindPasswordByEmail)=>{
        if(FindPasswordByEmail.length>0){
            bcrypt.comparePassword(password,FindPasswordByEmail[0].password,(err,CompareDone)=>{
                if(CompareDone == true){ 
                    showNameWithLogIn(email , (error , NameUser)=>{
             
                        let passwordToken = NameUser[0].password
                        let tokenLogIn = jwt.sign({email:email , password:passwordToken},key)
                    res.send({status:200, token:tokenLogIn})
                })
                }else{
                    res.send({status:400})
                }
        })
        }else{
            res.send({status:404})
        }
    })
    })

// put ngo
    // router.post(routeBase, (req, res) => {
    //     // let token = req.headers.
    //     let new_name = req.body.name;
    //     let new_bio = req.body.bio;
    //     let new_website = req.body.name;
    //     let new_logo = req.body.name;
    //     let token = req.headers.authorization.split(" ")[0]
    //     jwt.verify(token, key, (err, result) => {
    //         if (err) {
    //             res.sendStatus(404)
    //         } else {
    //             let id  =result.id;
    //             UpdateNgo(id,new_name,new_logo,new_website,new_bio,i=>{
    //             if(i){
    //                 res.sendStatus(201)
    //             }else{
    //                 res.sendStatus(400)
    
    //             }
    
    //             })
    
    //         }
    //     })
    // });

module.exports = router;