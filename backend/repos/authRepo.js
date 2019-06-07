var jwt = require ('jsonwebtoken');
var config = require('../secret.json')
exports.generateAccessToken = userInfo =>  { 
    var token = jwt.sign({userInfo}, config.secret, { 
        expiresIn: '10h'
    });

    return token;
}


exports.verifyToken = (req, res, next) => {
    //const tokenHeader = req.body.headers['Authorization'];
    const tokenHeader = req.body.headers['Authorization'];
    if (typeof (tokenHeader) !== 'undefined') {
        const splitHeader = tokenHeader.split(" ");
        const bearerToken = splitHeader[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}