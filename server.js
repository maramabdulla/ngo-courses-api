const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ngo = require('./api/ngo'),
    port = 3000
    trainers = require('./api/trainer')
;

app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json());
app.use(ngo);
app.use(trainers);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});