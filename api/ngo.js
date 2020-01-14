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
    let name         = req.body.name;
    let email        = req.body.email;
    let password     = req.body.password;
    const checkName  = /^[a-z]|[0-9]/i;
    const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
<<<<<<< HEAD
const checkPassword  = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
=======
    const checkPassword = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
>>>>>>> 1c3954abd12aee16ffdbaa07b37ca423de002280
if(checkName.test(name) == true && checkEmail.test(email) == true && checkPassword.test(password) == true) {
    checkNgoEmailExists(email, (EmailDidNotExisit, EmailExisted) => {
        if(EmailExisted==0){
            bcrypt.hashPassword(password,8,(HashingDidNotWork,HashingPasswordWorked)=>{
                if(HashingDidNotWork){
                    res.status(500);
                }else{
<<<<<<< HEAD
                    addNgoAccount(name,email,hashedpassword,(err,result)=>{
                        console.log(email)
                        console.log(result)
                        if(err){
                            res.status(404).send("Not Found");
                        }else{
                            console.log(result)


                        
=======
                    addNgoAccount(name,email,HashingPasswordWorked,(addNgoAccountFiled,addNgoAccountSuccessed)=>{
                        if(addNgoAccountFiled){
                            res.status(500);
                        }else{   
                            let id = addNgoAccountSuccessed.insertId
                            let tokenSignUp = jwt.sign({id:id,email:email,password:HashingPasswordWorked},key)
                            console.log(tokenSignUp)
                           res.status(201).send({id:id,token:tokenSignUp}); 
>>>>>>> 1c3954abd12aee16ffdbaa07b37ca423de002280
                        }
                       
                    });
                }
            })
        }else{
<<<<<<< HEAD

            res.status(226).send({status:"your Email is Exists"});

            res.status(226).send({states:"your Email is Exists"});

=======
            res.send({status:226})
>>>>>>> 1c3954abd12aee16ffdbaa07b37ca423de002280
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
                res.send({status:200, token:tokenLogIn,id:id})
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


// router.get(routeBase, (req, res) => {
//     res.send('success');
// });

// router.put(routeBase, (req, res) => {

// });

module.exports = router;
