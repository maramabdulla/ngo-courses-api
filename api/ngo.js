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
                        if(addNgoAccountFiled){
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
            res.status(226);
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
                    let id = NameUser[0].id
                    let passwordToken = NameUser[0].password
                    let tokenLogIn = jwt.sign({id:id , email:email , password:passwordToken},key)
                res.status(200).send({token:tokenLogIn,id:id})
            })
            }else{
                res.status(400).send({passWrong:"your password wrong or doesn't Exist"})
            }
    })
    }else{
        res.status(404).send({EmailWrong:"Your Email doesn't Exist"})
    }
})
})


// router.get(routeBase, (req, res) => {
//     res.send('success');
// });

// router.put(routeBase, (req, res) => {

// });

module.exports = router;