const
    express = require("express"),
    router = express.Router(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    routeBase = '/trainer',
     path = require('path'),
    fs = require('fs')
;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9951061722",
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
    // console.log(path.relative('/ngo-courses-api/imeges/trainers', 'C:/Users/ahmad/Desktop'));

    let base64Image = trainerphoto.split(';base64,').pop();
    
    const
    imgpath = "/imeges/trainers/"+trainerEmail+trainerNumber+".png",
    fullPath = process.cwd() + imgpath

;

    fs.writeFile(fullPath, base64Image, {encoding: 'base64'}, function(err) {
        console.log(fullPath);
    });
    

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

  router.delete(routeBase , (req, res) => {
    let id =req.body.id;
     con.query('DELETE FROM ngos_courses.trainers WHERE id='+id+' ',(err , rows, fields)=>{
       console.log(id)
       res.send(rows);
 
           }); 
   });


module.exports = router;