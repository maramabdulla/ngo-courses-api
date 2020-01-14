const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ngo = require('./api/ngo'),
    port = 3000,
    trainers = require('./api/trainer'),
    courses = require('./api/course')
;

app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json());
<<<<<<< HEAD
// app.use(ngo);
// app.use(trainers);
=======
app.use(ngo);
app.use(trainers);
>>>>>>> 1c3954abd12aee16ffdbaa07b37ca423de002280
// app.use(courses);
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});