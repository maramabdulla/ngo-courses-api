const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ngo = require('./api/ngo'),
    trainee = require('./api/trainee'),
    port = 3000,
    trainers = require('./api/trainer'),
    courses = require('./api/course')
;

app.use(express.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(trainee)
app.use(ngo);
app.use(trainers);
app.use('/imeges/trainers', express.static(__dirname + '/imeges/trainers'));
app.use('/imeges/ngos', express.static(__dirname + '/imeges/ngos'));

app.use(courses);
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});