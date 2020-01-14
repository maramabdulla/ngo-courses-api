const
    express = require("express"),
    bcrypt = require("../database/hash"),
    jwt = require("jsonwebtoken"),
    router = express.Router(),
    {checkTraineeEmailExists,addTraineeAccount,checkPasswordDB,showNameWithLogIn} = require('../traineeRepo/TraineeRepository'),
    routeBase = '/ngo'
;
//.....................................
const key = "iwearft54aw7eg6yq3urt4jy4567idfhjgkuiyut";
router.post(routeBase + '/register', (req, res) => {
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let adrees = req.body.adress;
    let phone = req.body.phone;
    const checkName = /^[a-z]|[0-9]/i;
    const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
    const checkPassword = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
    const checkAdress = /[0-9]|[a-z]/i;
    const checkPhone = /[0-9]/;
if(checkName.test(name) == true && checkEmail.test(email) == true &&
 checkPassword.test(password) == true && checkAdress.test(adrees) == true && checkPhone.test(phone)==true) {
    checkTraineeEmailExists(email, (EmailDidNotExisit, EmailExisted) => {
        if(EmailExisted==0){
            bcrypt.hashPassword(password,8,(HashingDidNotWork,HashingPasswordWorked)=>{
                if(HashingDidNotWork){
                    res.status(500);
                }else{
                    addTraineeAccount(name,email,HashingPasswordWorked,adrees,phone,(addNgoAccountFiled,addNgoAccountSuccessed)=>{
                        if(addNgoAccountFiled){
                            res.status(500);
                        }else{   
                            let id = addNgoAccountSuccessed.insertId
                            let tokenSignUp = jwt.sign({id:id,email:email,password:HashingPasswordWorked,address:adrees,phone:phone},key)
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


module.exports = router;