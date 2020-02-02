const express = require('express');
const app = express()
const mysql = require('mysql');
const  bodyparser=require('body-parser')
app.use(bodyparser.json())
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'API'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});



// app.get('/', (req, res) =>  res.send('Hello World!'))

  // function add_course(){
    app.post('/courses', (req, res) => {
    let title=req.body.title;
    let desctiption=req.body.desctiption;
    let dates=req.body.dates;
    let location=req.body.location;
    let triner=req.body.triner;
    let  number_of_seats=req.body.number_of_seats;
      let trinername=req.body.trinername;
  connection.query("INSERT INTO courses (`title`,`desctiption`,`dates`,`location`,`triner`,`number_of_seats`)VALUES("+ `'${title}'`+","+`'${desctiption}'`+"," + `'${dates}'`+","+`'${location}'`+","+`'${triner}'`+","+`'${number_of_seats}')`,(err,data)=>{
    console.log(data)
    console.log(err)
  });
    res.send(req.body)
    })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))