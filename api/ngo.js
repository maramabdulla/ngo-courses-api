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
    console.log(password)
    checkNgoEmailExists(email, (error, exists) => {
        console.log(error);
        if(exists==0){
            bcrypt.hashPassword(password,8,(err,hashedpassword)=>{
                if(err){
                    res.status(404).send("Not Found");
                }else{
                    addNgoAccount(name,email,hashedpassword,(err,result)=>{
                        console.log(email)
                        console.log(result)
                        if(err){
                            res.status(404).send("Not Found");
                        }else{
                            console.log(result)
<<<<<<< HEAD
=======
                            
>>>>>>> 75b423706714390643eb64bcfb66cdc41bfc4a50
                        }
                        let id = result.insertId
                     let tokenSignUp = jwt.sign({id:id,email:email,password:hashedpassword},key)
                        console.log(id)
                    
                    res.send({id:id,token:tokenSignUp});
                    
                    console.log(tokenSignUp)
                    });
                }
            })
        }else{
<<<<<<< HEAD
            res.status(226).send({status:"your Email is Exists"});
=======
            res.status(226).send({states:"your Email is Exists"});
>>>>>>> 75b423706714390643eb64bcfb66cdc41bfc4a50
        }
    })
}else{

    console.log("your information dosent write")
}
});
//...........................
router.post(routeBase + '/login', (req, res) => {
let email = req.body.email;
let password = req.body.password;
checkPasswordDB(email,(err,result)=>{
    if(result.length>0){
        bcrypt.comparePassword(password,result[0].password,(err,result)=>{
            console.log(result)
            if(result == true){ 
                showNameWithLogIn(email , (error , data)=>{
                    console.log(data[0].name,data[0].id,data[0].password)
                    let id = data[0].id
                    console.log(id)
                    let passwordToken = data[0].password
                    console.log(passwordToken)
                    let tokenLogIn = jwt.sign({id:id , email:email , password:passwordToken},key)
                res.status(200).send({succse:"Welcome to my website : " + data[0].name ,token:tokenLogIn,id:id})
            })
            }else{
                res.send({passWrong:"your password wrong or doesn't Exist"})
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