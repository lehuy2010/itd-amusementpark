var db = require ('../fn/mssql-db')
var bcrypt = require('bcrypt');



exports.verifyAdmin = entity => { 
    var selectHash = `select * from Employee where Account = '${entity.Username}'`;
    return db.load(selectHash)
}