var express = require ('express')
var homepagecontentRepo = require('../repos/homepage-contentRepo')
var router = express.Router();

router.get('/', (req,res) => {
    homepagecontentRepo.loadCardsInformation().then(rows => {
        res.json(rows)
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
    })
})
module.exports = router;