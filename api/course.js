const {createDatabaseConnection, DB_NAME} = require('../database/config');

const
    express = require("express"),
    router = express.Router(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    routeBase = '/courses'
;
/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'ngos_courses'
  });*/
  connection.connect(function(err){
    if(err) throw err;
  console.log("ok");  
  });
  router.get(routeBase, (req, res) => {
    connection.query('SELECT * FROM ngos_courses.courses',(err , rows, fields)=>{
      console.log(rows)
      res.send(rows);
          });     
  });

  router.delete(routeBase + '/:id', (req, res) => {
     let id=req.body.id;
      connection.query('DELETE FROM ngos_courses.courses WHERE id='+id+' ',(err , rows, fields)=>{
        console.log(id)
        res.send(rows);
  
            }); 
    });

    router.post( routeBase ,(req,res)=>{
        let title        = req.body.title;
        let date         = req.body.dates;
        let dateEnd      = req.body.dateEnd;
        let locations    = req.body.location;
        let range_weight = req.body.number_of_seats;
        let remain       = req.body.remain;
        let des          = req.body.desctiption;
    let sql=' INSERT INTO `ngos_courses`.`courses` (`title`,`dates`,`dateEnd`,`location`,`number_of_seats`,`remainSeats`,`description`) VALUES ('+ `'${title}'`+","+`'${date}'`+","+`'${dateEnd}'`+","+`'${locations}'`+","+`'${range_weight}'`+","+`'${remain}'`+","+`'${desc}'`+')';
        connection.query(sql,(err,result)=>{
            console.log(err);
            console.log(result.insertId);
            res.send(result);
        })
    })

    // app.put('/courses:id',(req,res)=>{
    //     let id=req.params.id;
    //     let title = req.body.title;
    //       let date=req.body.dates;
    //     let dateEnd=req.body.dateEnd;
    //       let locations=req.body.location;
    //       let range_weight=req.body.number_of_seats;
    //       let remain=req.body.remain;
    //       let desc=req.body.desctiption;
    //   let sql=' INSERT INTO `ngo_courses`.`courses` (`title`,`dates`,`dateEnd`,`location`,`number_of_seats`,`remainSeats`,`description`) VALUES ('+ `'${title}'`+","+`'${date}'`+","+`'${dateEnd}'`+","+`'${locations}'`+","+`'${range_weight}'`+","+`'${remain}'`+","+`'${desc}'`+')';
    //       connection.query(sql,(err,result)=>{
    //           console.log(err);
    //           console.log(result.insertId);
    //           res.send(result);
    //       })
    //   })
    module.exports = router;
