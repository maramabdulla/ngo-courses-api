const

    express = require("express"),
    {getOnetrainer,addtrainers,getALLtrainer,deleteTrainer,edittrainers} = require('../TrainerRepo/trainersRepo.js'),
    router = express.Router(),  
    routeBase = '/trainer',
    fs = require('fs')
;




router.post( routeBase , ( req , res ) =>{


    let trainerName = req.body.name;
    let trainerEmail = req.body.email;
    let trainerNumber = req.body.num;
    let traineraddress = req.body.address;
    let trainerphoto = req.body.photo; 
    let trainerbio = req.body.bio;
    let base64Image = trainerphoto.split(';base64,').pop();
    const
    imgpath = "/imeges/trainers/"+trainerEmail+trainerNumber+".png",
    fullPath = process.cwd() + imgpath

;

    fs.writeFile(fullPath, base64Image, {encoding: 'base64'}, function(err) {
        console.log(process.cwd());
    });

    addtrainers(trainerName,imgpath,trainerEmail,trainerNumber,traineraddress,trainerbio,(AddNewCoursesFailed , AddNewtrainerSuccssed)=>{
console.log(AddNewtrainerSuccssed);
      res.send(AddNewtrainerSuccssed);

    })
    
} );

router.get(routeBase,(req,res)=>{



  getALLtrainer((getAlltrainersFaild , getAlltrainerssuccssed)=>{

    
    res.send(getAlltrainerssuccssed)
  })
});


  router.delete(routeBase , (req, res) => {
    let id =req.body.id;
    deleteTrainer(id,(deleteFalid,deletesucsess)=>{

      res.send(deletesucsess)

    })
  });
   

   router.get(routeBase + '/:id', (req, res) => {
    id=req.params.id;
    getOnetrainer(id,(getOneTrainerFaild , getOneTrainersuccssed)=>{
        res.send(getOneTrainersuccssed)
    })    
  });



  router.put( routeBase + '/:id' , ( req , res ) =>{

    let     id=req.params.id;

    let trainerName = req.body.name;
    let trainerEmail = req.body.email;
    let trainerNumber = req.body.num;
    let traineraddress = req.body.address;
    let trainerphoto = req.body.photo; 
    let trainerbio = req.body.bio;
    let base64Image = trainerphoto.split(';base64,').pop();
    const
    imgpath = "/imeges/trainers/"+trainerEmail+trainerNumber+".png",
    fullPath = process.cwd() + imgpath

;

    fs.writeFile(fullPath, base64Image, {encoding: 'base64'}, function(err) {
        console.log(fullPath);
    });

    edittrainers(trainerName,imgpath,trainerEmail,trainerNumber,traineraddress,trainerbio,id ,(AddNewCoursesFailed , edittrainerSuccssed)=>{
console.log(edittrainerSuccssed);
      res.send(edittrainerSuccssed);

    })
    
} );

module.exports = router;