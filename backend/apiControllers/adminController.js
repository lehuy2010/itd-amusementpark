var express = require('express')
var router = express.Router()
var adminRepo = require('../repos/adminRepo');
var authRepo = require('../repos/authRepo');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../secret.json')

router.post('/login', (req, res) => {
    adminRepo.getAdminInfo(req.body).then(user => { 
        console.log('lấy ra user: ', user)
        if (typeof (user[0].Gender) === 'boolean') {
            if (user[0].Gender === true)
                user[0].Gender = 'Nam'
            else
                user[0].Gender = 'Nữ'
        }

        console.log('sau khi nhập mật khẩu, user là: ', user);

        bcrypt.compare(req.body.password, user[0].Password, function (err, result) {
            if (result) {
                var token = authRepo.generateAccessToken(user);
                res.json({
                    user,
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



router.post('/info', authRepo.verifyToken, (req,res) => { 
    jwt.verify(req.token, config.secret, (err, data) => {
        console.log('cục data :', data);
        if (err) {
            res.sendStatus(403);
        } else { 
            res.json({
                data
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