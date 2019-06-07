function errorHandling (err, req, res, next) { 
    if (typeof (err) === 'string') {
        // lỗi bên app
        return res.status(400).json({
            message: err
        });
    }

    if (err.name === 'UnauthorizedError') {
        // lỗi bên jwt
        return res.status(401).json({
            message: 'token không hợp lệ'
        });
    }   

    return res.status(500).json({
        message: err.message
    });
}

module.exports = errorHandling;