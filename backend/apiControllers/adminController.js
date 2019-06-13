var express = require('express')
var router = express.Router()
var adminRepo = require('../repos/adminRepo');
var authRepo = require('../repos/authRepo');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../secret.json')
var multer = require('multer');
var moment = require('moment');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../ticket-temp/src/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage});

router.post('/addimage', upload.single('image'), (req,res) => {
    if (req.file)
        res.json({
            imageUrl: `${req.file.filename}`
        });
    else
        res.status("409").json("No Files to Upload.");
})

router.post('/addgame', async (req,res) => { 
    console.log('kiểm tra params: ', req.body.params);
    console.log('kiểm tra tên hình: ', req.body.params.gameImgName);
    var temp = await adminRepo.getTicketID();
    console.log('kiểm tra id cuối cùng: ', temp[0].TicketTypeID);
    var latestID = temp[0].TicketTypeID
    await adminRepo.addGame(req.body.params, latestID)
    
    temp = await adminRepo.getTicketID();
    console.log('id cuối lúc này:', temp[0].TicketTypeID);

    await adminRepo.addAdultTicket(req.body.params, temp[0].TicketTypeID)
    await adminRepo.addChildrenTicket(req.body.params, temp[0].TicketTypeID)
    res.json({
        message: 'thêm game thành công'
    })
    // .then(result => { 
    //     temp = adminRepo.getTicketID();
    //     latestID = temp[0].TicketTypeID
    //     console.log('sau khi insert trò mới vào, id mới là ', latestID);
        
    // }).then(res => { 
    //     console.log('insert 3 dòng thành công', res)
    // }).catch(err => { 
    //     console.log('lỗi', err)
    // })
})

router.post('/login', (req, res) => {
    adminRepo.getAdminInfo(req.body).then(user => { 
        if (typeof (user[0].Gender) === 'boolean') {
            if (user[0].Gender === true)
                user[0].Gender = 'Nam'
            else
                user[0].Gender = 'Nữ'
        }
        bcrypt.compare(req.body.password, user[0].Password, function (err, result) {
            if (result) {
                var token = authRepo.generateAccessToken(user);
                res.json({
                    
                    token: token
                })
            }
            else {
                res.status(401).json({
                    error: 'Sai tên đăng nhập hoặc mật khẩu'
                })
            }
        })
        }).catch(err => {
            console.log(err);
            res.status(500)
                .json({
                    error: 'Sai tên đăng nhập hoặc mật khẩu'
                })
        })
    })


router.post('/authenticate', authRepo.verifyToken, (req,res) => { 

    jwt.verify(req.token, config.secret, (err, data) => { 
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.sendStatus(200);
        }
    })
})

router.post('/info', authRepo.verifyToken, (req,res) => { 
    
    jwt.verify(req.token, config.secret, (err, data) => {
        
        if (err) {
            res.sendStatus(403);
        } else { 
            res.json({
                token: req.token,
                sentData: data.userInfo
            })
        }
    })
   
})

router.post('/saveuser', (req,res) => {
    console.log('khi qua đây, data là : ', req.body.params)
    adminRepo.saveEmployeeInfo(req.body.params).then(rows => { 
        res.json(rows);
    }).catch(err => { 
        res.statusCode = 500
        console.log(err);
    })
})
module.exports = router;