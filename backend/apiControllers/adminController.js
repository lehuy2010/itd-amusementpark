var express = require('express')
var router = express.Router()
var adminRepo = require('../repos/adminRepo');
var bcrypt = require('bcrypt');

router.post('/', (req,res) => {
    adminRepo.verifyAdmin(req.body.params).then(rows => {
        console.log('pass là :', rows[0].Password);
        if ( typeof(rows[0].Gender) === 'boolean') {
            if (rows[0].Gender === true) 
            rows[0].Gender = 'Nam'
            else
            rows[0].Gender = 'Nữ'
        }
        bcrypt.compare(req.body.params.Password,rows[0].Password,function(err,result) {
            if(result == true)
            {
            console.log('ĐÚNG MẬT KHẨU');
            res.json(rows)
            }
            
            else {
            res.status(404).send('Sai tài khoản hoặc mật khẩu')
            }
        })
        
    })
    .catch(err => {
        console.log('SAI ỜI');
        res.status(404).send('Sai tài khoản hoặc mật khẩu');
    })
})

router.get('/alluser', (req,res) => { 
    adminRepo.getAdminInfo().then(rows => {
        res.json(rows);
    }).catch(err => { 
        res.statusCode = 500
        console.log(err);
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