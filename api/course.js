const
    express = require("express"),
    {AddNewCourses} = require('../courses/courseRepository'),
    {getAllCourses} = require('../courses/courseRepository'),
    {deleteCourse}= require('../courses/courseRepository'),
    router = express.Router(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    routeBase = '/courses'
;

  router.get(routeBase, (req, res) => {
    getAllCourses((getAllCoursesFaild , getAllCoursessuccssed)=>{
      console.log(getAllCoursesFaild );
      console.log(getAllCoursessuccssed);
      res.send(getAllCoursessuccssed)
    })    
  });

  // router.get('/trainer',(req,res)=>{
   
  // });
  router.delete(routeBase , (req, res) => {
    let id=req.body.id;
    deleteCourse(id ,(erroeDelete,ssuccssedDelete)=>{
      res.send(ssuccssedDelete);
    });
  })
    router.post( routeBase ,(req,res)=>{
        let title = req.body.title;
        let dateBegin=req.body.date_begin;
      let dateEnd=req.body.date_end;
        let locations=req.body.location;
        let range_weight=req.body.number_of_seats;
        let desc=req.body.desctiption;
    const setOfNumder = /[0-9]/;
    const checkName = /^[a-z]|[0-9]/i;
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if(checkName.test(title) == true && dateformat.test(dateBegin) == true  && dateformat.test(dateEnd) == true && setOfNumder.test(range_weight) == true ){
      AddNewCourses(title , dateBegin , dateEnd , locations , range_weight , desc ,(AddNewCoursesFailed , AddNewCoursesSuccssed)=>{
        console.log(AddNewCoursesFailed);
        console.log(AddNewCoursesSuccssed);
        res.send(AddNewCoursesSuccssed);
      })    
      }
        else{
          res.send('error in name of course or date');
        }


      })
    // if(checkName == true){
    //   console.log(result);
    //   res.send(result);

    // })

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
      // router.get(routeBase + '/:id', (req, res) => {
  //   id=req.params.id;
  //   getOneCourse((getOneCoursesFaild , getOneCoursessuccssed)=>{
  //     console.log(getOneCoursesFaild );
  //     console.log(getOneCoursessuccssed);
  //     res.send(getOneCoursessuccssed)
  //   })    
  // });
    module.exports = router;
