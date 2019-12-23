let port = 3000;
let express = require('express');
let app = express();
let bb = require('body-parser');
let sql = require('mysql');
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
app.use(bb.json());
let key = "qfshdjndsl,lvend74568+_)#$(%^*(^$%)#$";
let ry;
let token;
app.post('/input', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    token = jwt.sign({ e: email, p: ry, n: name }, key);
    bcrypt.hash(password, 8, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            ry = data;
            gett(ry, token);
        }
        con.query("insert into ngos (`name`, `email`, `password`) value (" + `'${name}','${email}','${ry}')`, (err, data) => {
            console.log(err);
            console.log(data);
            res.send(req.body)
        })
    });
})
let get;
let getpa;
let getna;
let getAlert;
let con = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'ngo_courses'
})
app.get('/name/:name', (req, res) => {
    let name = req.params.name;
    con.query("select * from ngos where (`name` =" + `'${name}')`
        , (err, data) => {
            getna = data;
            res.send(getna);
        })
})
app.get('/alert/:password', (req, res) => {
    let alert = req.params.password;
    con.query("select name from ngos where (`password` =" + `'${alert}')`
        , (err, data) => {
            getAlert = data;
            res.send(getAlert);
            console.log(err)
        })
})
app.get('/email/:email', (req, res) => {
    let email = req.params.email;
    con.query("select * from ngos where (`email` =" + `'${email}')`
        , (err, data) => {
            get = data;
            res.send(get);
        })
})
function gett(ry, token) {
    app.get('/pass/:pass', (req, res) => {
        let pass = req.params.pass;
        bcrypt.compare(pass, ry, (err, data) => {
            console.log(data)
            if (err) {
                res.status(404).send("NOT found")
                return false;
            } else {
                getpa = data;
                res.setHeader("Authorization", "Barear " + token);
                res.status(200).send(getpa)
            }
        })
    })
}
app.listen(port, () => {
    console.log("connected ......");
})
