const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    ngo = require('./api/ngo'),
    port = 3000
;

app.use(bodyParser.json());
app.use(ngo);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});