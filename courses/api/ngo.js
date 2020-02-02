const
    express = require("express"),
    bcrypt = require("../database/hash"),
    jwt = require("jsonwebtoken"),fs=require("fs")
    router = express.Router(),
    { checkNgoEmailExists, addNgoAccount, checkPasswordDB, showNameWithLogIn, UpdateNgo, states,getNGO,checkPasswordByEmail,GetHAshPassword,EditPassword} = require('../ngo/NgoRepository'),
    routeBase = '/ngo'
    ;
//.....................................
const key = "iwearft54aw7eg6yq3urt4jy4567idfhjgkuiyut";
router.post(routeBase + '/register', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    const checkName = /^[a-z]|[0-9]/i;
    const checkEmail = /[a-z0-9_\.\-]+@+[a-z_\.\-]+\.+[a-z]/i;
    const checkPassword = /[a-z]+|[0-9]+|\!+|\@+|\#+|\$+|\%+|\&/i;
    if (checkName.test(name) == true && checkEmail.test(email) == true && checkPassword.test(password) == true) {
        checkNgoEmailExists(email, (EmailDidNotExisit, EmailExisted) => {
            if (EmailExisted == 0) {
                bcrypt.hashPassword(password, 8, (HashingDidNotWork, HashingPasswordWorked) => {
                    if (HashingDidNotWork) {
                        res.status(500);
                    } else {
                        addNgoAccount(name, email, HashingPasswordWorked, (addNgoAccountFiled, addNgoAccountSuccessed) => {
                            console.log(addNgoAccountSuccessed)
                            if (addNgoAccountFiled) {
                                console.log(addNgoAccountFiled)
                                res.status(500);
                            } else {
                                let id = addNgoAccountSuccessed.insertId
                                let tokenSignUp = jwt.sign({ id: id, email: email, password: HashingPasswordWorked }, key)
                                res.status(201).send({ id: id, token: tokenSignUp });
                            }

                        });
                    }
                })
            } else {
                res.send({ status: 226, err: EmailDidNotExisit })

            }
        })
    } else {

        res.status(400)
    }
});

//...........................
router.post(routeBase + '/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    checkPasswordDB(email, (err, FindPasswordByEmail) => {
        console.log(err)
        console.log(FindPasswordByEmail)
        if (FindPasswordByEmail.length > 0) {
            bcrypt.comparePassword(password, FindPasswordByEmail[0].password, (err, CompareDone) => {
                console.log(err)
                if (CompareDone == true) {
                    showNameWithLogIn(email, (error, NameUser) => {
                        let idToken = NameUser[0].id;
                        console.log(idToken)
                        let passwordToken = NameUser[0].password
                        let tokenLogIn = jwt.sign({ email: email, password: passwordToken, id: idToken }, key)
                        res.send({ status: 200, token: tokenLogIn , id : idToken})
                    })
                } else {
                    res.send({ status: 400 })
                }
            })
        } else {
            res.send({ status: 404 })
        }
    })
})



//////////////////////////////////////////////////////PUT PASSWORD
router.put(routeBase + '/password', (req, res) => {
    let token =  req.headers.authorization.split(":")[1];
    console.log(token)
    let new_password = req.body.new_password;
    let old_password = req.body.old_password;
    jwt.verify(token, key, (err, result) => {
        if (err) {
            console.log(err)
        }
        let id_user = result.id;
        let email_user = result.email;

        GetHAshPassword(id_user, (err, resulthashpassword) => {
            if (err) {
                console.log(err)
            } else {
                bcrypt.comparePassword(old_password, resulthashpassword[0].password, (err, result) => {
                    if (result != true) {
                        res.send({ s: result })
                    } else {
                        console.log(resulthashpassword)

                        checkPasswordByEmail(id_user, email_user, (err, result) => { 

                                bcrypt.hashPassword(new_password, 8, (err, newPassword) => {
                                    EditPassword(id_user, newPassword, (err, result) => {
                                        res.send({ state: "your password changed" })
                                    })

                                })

                        })
                    }

                })


            }
        })
    })
});



///////////////////////////////////////////////////////////////////////////////////////////////////PUT NGO
router.put(routeBase, (req, res) => {
    let new_name = req.body.name;
    let new_bio = req.body.bio;
    let new_website = req.body.website;
    let new_logo = req.body.logo;
    let base64Image = new_logo.split(';base64,').pop();
    let
    imgpath = "/images/ngo/"+new_name+".png",
    fullPath = process.cwd() + imgpath


fs.writeFile(fullPath, base64Image, {encoding: 'base64'}, function(err) {
    console.log(err)
    console.log(fullPath);
});

    console.log(req.body)
    let token = req.headers.authorization.split(":")[1]
    jwt.verify(token, key, (err, result) => {
        console.log(result)

        if (err) {
            res.sendStatus(404)

        } else {
            let id = result.id;
            console.log(id)
            UpdateNgo(id, new_name, imgpath, new_website, new_bio, (i) => {
                if (i != false) {
                    states(res)

                }
            })


        }
    })
});



router.get(routeBase,(req,res)=>{
    let token = req.headers.authorization.split(":")[1]
    jwt.verify(token, key, (err, result) => {
        if(err){
            res.sendStatus(404)
        }else{
            let idCLint=result.id
            getNGO(idCLint,data=>{
                res.send(data)
             })
             

        }

    })


})


module.exports = router;