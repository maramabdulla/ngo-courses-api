const express = require('express')
const app = express()
const port = 3000;
bodyParser = require('body-parser') ;
app.use(bodyParser.json());
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9951061722",
  database : "ngo_courses"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/trainer',(req,res)=>{
  con.query('SELECT * FROM triner',(err , rows, fields)=>{

    console.log(rows);
    res.send(rows);

  })

});

app.post( "/trainer" , ( req , res ) =>{

    let trainerName = req.body.name;
    let trainerEmail = req.body.email;
    let trainerNumber = req.body.num;
    let traineraddress = req.body.address;
    let trainerphoto = req.body.photo; 


    const sql = "INSERT INTO triner  ( `triner`,`picture`, `email`, `mobile`, `address`) VALUES ( '" +trainerName +" ', '" + trainerphoto+" ', '" + trainerEmail+" ', '" + trainerNumber + " ', '" + traineraddress + "' ) ;" ;
    con.query(sql, function(err,result){
        console.log(err);
        console.log(result);
        res.send(result)
    });
} )



app.listen(port, () => console.log(`Example app listening on port ${port}!`))