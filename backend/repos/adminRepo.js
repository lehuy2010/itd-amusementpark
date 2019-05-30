var db = require ('../fn/mssql-db')
var bcrypt = require('bcrypt');
var moment = require('moment')


exports.verifyAdmin = entity => { 
    // var selectHash = `select EmployeeID as ID, Password, EmployeeName as Name, Gender, 
    // Birthday as N'Ngày Sinh', Phone as N'Số điện thoại', Address as N'Địa chỉ',
    // ModifyDate as N'Ngày chỉnh sửa cuối cùng' from Employee where Account = '${entity.Username}'`;

    var newHash = `select EmployeeID, Password, EmployeeName, Gender, Birthday, Phone, Address,
    ModifyDate from Employee where Account = '${entity.Username}'`;
    return db.load(newHash)
}

exports.getAdminInfo = () => { 
    var sql = `select EmployeeID as ID, EmployeeName as Name, Gender, 
    Birthday as N'Ngày Sinh', Phone as N'Số điện thoại', Address as N'Địa chỉ',
    ModifyDate as N'Ngày chỉnh sửa cuối cùng' from Employee`
    return db.load(sql)
}

exports.saveEmployeeInfo = (entity) => { 
    var currentTime = moment().format("YYYY-MM-DD HH:mm:ss:SS")
    var sql = `update Employee set EmployeeName = N'${entity.EmployeeName}', Birthday =  '${entity.Birthday}',
    Phone = '${entity.Phone}', Address = '${entity.Address}', ModifyDate = '${currentTime}' where EmployeeID = '${entity.EmployeeID}'`;
    console.log(sql);
    return db.insert(sql);
}