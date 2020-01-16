const

    express = require("express"),
    {getOnetrainer,addtrainers,getALLtrainer,deleteTrainer} = require('../TrainerRepo/trainersRepo.js'),
    router = express.Router(),  
    routeBase = '/trainer',
     path = require('path'),
    fs = require('fs')
;




router.post( routeBase , ( req , res ) =>{

  addtrainers(addAllFalid,addAllSucsess)

  res.send(addAllSucsess)

//     let trainerName = req.body.name;
//     let trainerEmail = req.body.email;
//     let trainerNumber = req.body.num;
//     let traineraddress = req.body.address;
//     let trainerphoto = req.body.photo; 
//     let trainerbio = req.body.bio;
//     let base64Image = trainerphoto.split(';base64,').pop();
//     const
//     imgpath = "/imeges/trainers/"+trainerEmail+trainerNumber+".png",
//     fullPath = process.cwd() + imgpath

// ;

//     fs.writeFile(fullPath, base64Image, {encoding: 'base64'}, function(err) {
//         console.log(fullPath);
//     });
    

//     const sql = "INSERT INTO trainers  ( `name`,`picture`, `email`, `mobile`, `address`, `short_bio`) VALUES ( '" +trainerName +" ', '" + imgpath +" ', '" + trainerEmail+" ', '" + trainerNumber + " ', '" + traineraddress + "', '" + trainerbio + "' ) ;" ;
//     con.query(sql, function(err,result){
//         console.log(err);
//         console.log(result);
//         res.send(result)
//     });
} );

router.get(routeBase,(req,res)=>{
  getALLtrainer(getAllFalid,getAllSucsess);
  res.send(getAllSucsess);
    
  });

  router.delete(routeBase , (req, res) => {
    let id =req.body.id;
    deleteTrainer(id,(deleteFalid,deletesucsess))
    res.send(deletesucsess)
   });

   router.get(routeBase + '/:id', (req, res) => {
    id=req.params.id;
    getOnetrainer(id,(getOneTrainerFaild , getOneTrainersuccssed)=>{
        res.send(getOneTrainersuccssed)
    })    
  });


module.exports = router;