//........................................................
let e = require("express");
let bp = require("body-parser");
let sql = require("mysql");
//........................................................
let con = sql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "ngos_courses"
})
//........................................................
let app = e();
app.use(bp.json());
app.use(e.static("/s"))
app.get("/start", (req, res) => {
    res.sendFile(__dirname + "/s/index.html");
})
//........................................................

/////////////get_trainers
app.get("/get_trainers", (req, res) => {
    get_trainers(res);
})
/////////////////end get_trainers
//........................................................

////////post
app.post("/new", (req, res) => {
    let name = req.body.name;
    let picture = req.body.picture;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let address = req.body.address;
    let short_bio = req.body.short_bio;
    console.log(name)
    add_trainer(name, picture, email, mobile, address, short_bio, res);
})
//........................................................

////////////function add_trainer
function add_trainer(name, email, mobile, address, picture, bio, res) {
    con.query("INSERT INTO `ngos_courses`.`trainers` (`name`, `picture`, `email`, `mobile`, `address`,`short_bio`) VALUES" + `('${name}', '${picture}', '${email}', '${mobile}', '${address}', '${bio}')`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
}
/////////////////end add_trainer
//........................................................

//////////put
app.put("/edit", (req, res) => {
    let name = req.body.name;
    let picture = req.body.picture;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let address = req.body.address;
    let short_bio = req.body.short_bio;
    let id = req.body.id;
    edit_trainer(name, picture, email, mobile, address, short_bio, id);
    res.send("edit:" + id);

})
//........................................................

////////delete
app.delete("/delete", (req, res) => {
    let id = req.body.id;
    delete_trainer(id);
    res.send("delete:" + id);
    console.log("working")
})
//........................................................

////////////function delete_trainer
function delete_trainer(id) {
    con.query("DELETE FROM `ngos_courses`.`trainers` WHERE (`id` " + `= '${id}')`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(id+":del")
        }
    })
}
/////////////////end delete_trainer

//........................................................

////////////function edit_trainer
function edit_trainer(name, email, mobile, address, picture, bio, id) {
    con.query("UPDATE `ngos_courses`.`trainers` SET `name`" + ` = '${name}',` + "`picture`" + `= '${email}'` + ", `email` " + `= '${mobile}',` + " `mobile` " + `= '${address}',` + "`address` " + `= '${picture}',` + "`short_bio`" + ` = '${bio}'` + "WHERE (`id` = " + `'${id}');`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result)
        }
    })
}
/////////////////end edit_trainer

//........................................................
////////////function get_trainers
function get_trainers(response) {
    con.query("SELECT * FROM ngos_courses.trainers;", (err, result) => {
        response.send(result);
        console.log(result)
    });
}
////////////////end get_trainers
app.listen(3000)