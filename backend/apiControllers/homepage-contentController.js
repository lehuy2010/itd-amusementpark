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

router.post('/game', (req,res) => {
    console.log('test: ', req.body.id)
    homepagecontentRepo.loadCardsById(req.body.id)
    .then(rows => {
        res.json(rows)
        console.log(rows)
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            error: 'Không tồn tại'
        })
    })
})
module.exports = router;