const
    express = require("express"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    router = express.Router(),
    {checkNgoEmailExists} = require('../ngo/NgoRepository'),
    routeBase = '/ngo'
;

router.post(routeBase + '/register', (req, res) => {
    checkNgoEmailExists('basharaq@gmail.com', (error, exists) => {
        console.log(error);
        res.send(exists);
    })
});

router.get(routeBase + '/login', (req, res) => {
    res.send('success');
});

router.get(routeBase, (req, res) => {
    res.send('success');
});

router.put(routeBase, (req, res) => {

});

module.exports = router;