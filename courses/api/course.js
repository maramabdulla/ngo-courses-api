const
    express = require("express"),
    {AddNewCourses,getAllCourses,deleteCourse,getTrainerName,updataInfromationCOurses,getOneCourse, SearchCourse,getAllCoursesNgo,registerTrainee,UNRegisterTrainee,GetRegisteredTrainees} = require('../coursesRep/courseRepository.js'),
    router = express.Router(),
    jwt = require("jsonwebtoken"),
    // bodyParser = require('body-parser'),
    routeBase = '/courses',
    key = "iwearft54aw7eg6yq3urt4jy4567idfhjgkuiyut"
;
let pagesize=20;
  router.get(routeBase , (req, res) => {
    const page=req.query.page;
     start=(page-1)*pagesize;
     end=start+ pagesize;
    getAllCourses((getAllCoursesFaild , getAllCoursessuccssed)=>{
      // console.log(getAllCoursesFaild );
      // console.log(getAllCoursessuccssed);
      res.send(getAllCoursessuccssed.slice(start,end))
    })    
  });

  router.get('/trainer',(req,res)=>{
    getTrainerName((gettranierfaild,gettrainersessucssed)=>{
      res.send(gettrainersessucssed);
    })
   
  });
  router.delete(routeBase , (req, res) => {
    let id=req.body.id;
    let id_ngo=req.body.id_ngo;
    deleteCourse(id ,id_ngo,(erroeDelete,ssuccssedDelete)=>{
      res.send(ssuccssedDelete);
    });
  })
    router.post( routeBase + '/:id_ngo',(req,res)=>{
      // let token = req.headers.authorization.split(" ")[0];
      let id_ngo=req.params.id_ngo;
        let title = req.body.title;
        let dateBegin=req.body.date_begin;
      let dateEnd=req.body.date_end;
        let locations=req.body.location;
        let range_weight=req.body.number_of_seats;
        let desc=req.body.desctiption;
        let  trainerName=req.body.trainerName;
    const setOfNumder = /[0-9]/;
    const checkName = /^[a-z]|[0-9]/i;
    var dateformat =/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if(checkName.test(title) == true && dateformat.test(dateBegin) == true  && dateformat.test(dateEnd) == true && setOfNumder.test(range_weight) == true )
    {
      AddNewCourses(title , dateBegin , dateEnd , locations , range_weight , desc ,trainerName,id_ngo,(AddNewCoursesFailed , AddNewCoursesSuccssed)=>{
        let token = jwt.sign({title:title , locations:locations},key)
        console.log(AddNewCoursesFailed);
        console.log(AddNewCoursesSuccssed);
        res.send({status:200 , token:token , result: AddNewCoursesSuccssed});
      })    
      }
        else{
          res.send({status:500});
        }


      })
      
      router.put(routeBase + '/:id' ,(req,res)=>{
        let id=req.params.id;
        let title = req.body.title;
        let dateBegin=req.body.date_begin;
      let dateEnd=req.body.date_end;
        let locations=req.body.location;
        let range_weight=req.body.number_of_seats;
        let desc=req.body.desctiption;
    let trainer=req.body.trinername;
         updataInfromationCOurses(id,title, dateBegin, dateEnd, locations, range_weight, desc,(errupdata,scusccedupdata)=>{
        res.send(scusccedupdata)
      })
      
    })
      router.get(routeBase + '/:id', (req, res) => {
    id=req.params.id;
    getOneCourse(id,(getOneCoursesFaild , getOneCoursessuccssed)=>{
      // console.log(getOneCoursesFaild );
      // console.log(getOneCoursessuccssed);
      res.send(getOneCoursessuccssed)
    })    
  });
  router.get(routeBase , (req, res) => {
    let title=req.query.title;
    // console.log(req.query);
     SearchCourse(title,(erroeDelete,ssuccssedSearch)=>{
       res.send(ssuccssedSearch);
     });
   })
   router.get(routeBase+'/ngos/:id_ngo' , (req, res) => {
    let id_ngo=req.params.id_ngo;
getAllCoursesNgo(id_ngo,(getAllCoursesByNgoFaild, getAllCoursesByNgosuccssed)=>{
  console.log(getAllCoursesByNgoFaild );
  console.log(getAllCoursesByNgosuccssed);
  res.send(getAllCoursesByNgosuccssed);
  // res.send({status : 200 , result:getAllCoursesByNgosuccssed})
}) 
    
    
  });
  router.get(routeBase +'/trainee',(req, res) =>{
    GetRegisteredTrainees((GetRegisteredTraineesFaild,GetRegisteredTraineesSsuccssed)=>{
      res.send(GetRegisteredTraineesSsuccssed)
    })
  })
  router.get(routeBase+'/trainee/:id_course' , (req, res) =>{
    let id_course=req.params.id_course;
    registerTrainee(id_course,(registerTraineeFaild,registerTraineessuccssed)=>{
      res.send(registerTraineessuccssed);
    })
  });
  router.delete(routeBase+'/trainee/:id_trainee' , (req, res) =>{
    let id_trainee=req.params.id_trainee;
    UNRegisterTrainee(id_trainee,(UNregisterTraineeFaild,UNregisterTraineessuccssed)=>{
      res.send(UNregisterTraineessuccssed);
    })
  });
 
  //SELECT * FROM ngos_courses.courses_trainee  WHERE NOT(ngos_courses.courses.id=ngos_courses.courses_trainee.id_course)
    module.exports = router;
