const
    express = require("express"),
    bcrypt = require("../database/hash"),
    jwt = require("jsonwebtoken"),
    router = express.Router(),
    {checkTraineeEmailExists,getAllTrainee,addTraineeAccount,checkPasswordDB,showNameWithLogIn,UpdatePasswordTrainee,UpdateInformationTrainee} = require('../traineeRepo/TraineeRepository'),
    routeBase = '/trainee'
;
//.....................................
const key = "iwearft54aw7eg6yq3urt4jy4567idfhjgkuiyut";
router.post(routeBase + '/registerTrainee', (req, res) => {
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let address = req.body.address;
    let phone = req.body.phone;
    const checkName = /^[a-z]|[0-9]/i;
    const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
    const checkPassword = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
    const checkAdress = /[0-9]|[a-z]/i;
    const checkPhone = /[0-9]/;
if(checkName.test(name) == true && checkEmail.test(email) == true &&
 checkPassword.test(password) == true && checkAdress.test(address) == true && checkPhone.test(phone)==true) {
    checkTraineeEmailExists(email, (EmailDidNotExisit, EmailExisted) => {
        if(EmailExisted==0){
            bcrypt.hashPassword(password,8,(HashingDidNotWork,HashingPasswordWorked)=>{
                if(HashingDidNotWork){
                    res.status(500);
                }else{
                    addTraineeAccount(name,email,HashingPasswordWorked,address,phone,(addNgoAccountFiled,addNgoAccountSuccessed)=>{
                        if(addNgoAccountFiled){
                            res.status(500);
                        }else{   
                            let id = addNgoAccountSuccessed.insertId
                            let tokenSignUp = jwt.sign({id:id,email:email,password:HashingPasswordWorked,address:address,phone:phone},key)
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
router.post(routeBase + '/loginTrainee', (req, res) => {
let email = req.body.email;
let password = req.body.password;
checkPasswordDB(email,(err,FindPasswordByEmail)=>{
    if(FindPasswordByEmail.length>0){
        bcrypt.comparePassword(password,FindPasswordByEmail[0].password,(err,CompareDone)=>{
            if(CompareDone == true){ 
                showNameWithLogIn(email , (error , NameUser)=>{
                    let idToken = NameUser[0].id
        
                    let passwordToken = NameUser[0].password
                    let tokenLogIn = jwt.sign({id:idToken, email:email , password:passwordToken},key)
                res.send({status:200, token:tokenLogIn , id:idToken})
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

router.put(routeBase + '/EditePasswordTrainee', (req, res) => {
    let token =  req.headers.authorization.split(" ")[0];
    console.log(token)
    let old_password = req.body.old_password;
    let new_password = req.body.new_password;
    jwt.verify(token, key, (TokenIndefind, InfoByToken) => {
        console.log(InfoByToken)
        if (TokenIndefind) {
            res.send({status:404})
        }
        let id = InfoByToken.id;
        let email = InfoByToken.email;
        let password = InfoByToken.password;
        bcrypt.comparePasswordTrainee(old_password , password , (CompairFiled , compiesDone)=>{
            if(compiesDone == false) {
                res.send({status : 404})
            }else{
                bcrypt.hashPasswordTrainee(new_password , 8 , (HashingFiled , HashingSuccessed)=>{
                    UpdatePasswordTrainee(id,HashingSuccessed,(FiledUpdate , SuccssedUpdate)=>{
                        if(FiledUpdate) {
                            res.send({status : 400})
                        }else{
                            let token = jwt.sign({id:id,email:email,password:password},key);
                        res.send({status:200 , result : SuccssedUpdate , token:token})
                        }
                    })
                })
         
            }
        })


    })
});

router.put(routeBase + '/EditeInformation' , (req , res)=>{
    let name = req.body.name;
    let phone = req.body.phone;
    let address = req.body.address;
    let token = req.headers.authorization.split(" ")[0];
    jwt.verify(token , key , (tokenFiled , resultOfToken)=>{
        console.log(tokenFiled)
        console.log(resultOfToken)
        let id = resultOfToken.id
        if(tokenFiled) {
            res.send({status : 400})
        }else{
            UpdateInformationTrainee(id , name , phone , address , (EditeFiled , EditeSuccssed)=>{
                console.log(EditeFiled)
                if(EditeFiled){
                    res.send({status:404})
                }else{
            let tokenTrainee = jwt.sign({id:id,name:name,phone:phone,address:address},key)
            res.send({
                id:id , result:EditeSuccssed , token:tokenTrainee
            })
                }
            })
        }
    })

    

})

let pagesize = 9;
router.get(routeBase + '/getTrainee/page/:page' ,(req , res)=>{
    let page = req.params.page;
    let start = (page-1)*pagesize;
    let end = start + pagesize;
    getAllTrainee((FiledGetTrainee , FoundTrainee)=>{
        if(FiledGetTrainee) {
            res.send({status : 404})
        }else{
         let result = FoundTrainee.slice(start , end)
            res.send({status:200,result:result})
        }
    })
})

module.exports = router;