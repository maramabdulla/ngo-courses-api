const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ngo = require('./api/ngo'),
    trainee = require('./api/trainee'),
    port = 3000,
    // trainers = require('./api/trainer'),
    courses = require('./api/course')
;

app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json());

app.use(trainee)
app.use(ngo);
<<<<<<< HEAD
// app.use(trainers);
app.use(courses);
=======
app.use(trainers);
app.use('/imeges/trainers', express.static(__dirname + '/imeges/trainers'));
// app.use(courses);
>>>>>>> c16d6761d521b851d8493028284a5f45fd2a6cb6
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});