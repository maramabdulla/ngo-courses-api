const
    express = require("express"),
    router = express.Router(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    routeBase = '/trainer',
    fs = require('fs')
;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database : "ngos_courses"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


router.post( routeBase , ( req , res ) =>{

    let trainerName = req.body.name;
    let trainerEmail = req.body.email;
    let trainerNumber = req.body.num;
    let traineraddress = req.body.address;
    let trainerphoto = req.body.photo; 
    let trainerbio = req.body.bio;

    let base64Image = trainerphoto.split(';base64,').pop();

    fs.writeFile("C:/Users/ahmad/Desktop/ngo-courses-api/imeges/trainers/"+trainerEmail+trainerNumber+".png", base64Image, {encoding: 'base64'}, function(err) {
        console.log('File created');
    });
    let imgpath = "C:/Users/ahmad/Desktop/ngo-courses-api/imeges/trainers/"+trainerEmail+trainerNumber+".png"


    const sql = "INSERT INTO trainers  ( `name`,`picture`, `email`, `mobile`, `address`, `short_bio`) VALUES ( '" +trainerName +" ', '" + imgpath +" ', '" + trainerEmail+" ', '" + trainerNumber + " ', '" + traineraddress + "', '" + trainerbio + "' ) ;" ;
    con.query(sql, function(err,result){
        console.log(err);
        console.log(result);
        res.send(result)
    });
} );

router.get(routeBase,(req,res)=>{
    con.query('SELECT * FROM trainers',(err , rows, fields)=>{
  
      console.log(rows);
      res.send(rows);
  
    })
  
  });


module.exports = router;