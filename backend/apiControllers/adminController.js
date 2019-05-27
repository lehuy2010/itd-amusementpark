var express = require('express')
var router = express.Router()
var adminRepo = require('../repos/adminRepo');
var bcrypt = require('bcrypt');

router.post('/', async (req,res) => {
    adminRepo.verifyAdmin(req.body.params).then(rows => {
        console.log('password đã lấy trong database ra là: ', rows[0].Password)
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

module.exports = router;