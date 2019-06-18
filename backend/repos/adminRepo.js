var db = require ('../fn/mssql-db')
var moment = require('moment')

exports.getAdminInfo = entity => { 
    var newHash = `select EmployeeID, Password, EmployeeName, Gender, Birthday, Phone, Address,
    ModifyDate, IsUsed from Employee where Account = '${entity.username}'`;
    return db.load(newHash)
}
exports.verifyAdminID = id => { 
    var sql = `select RoleID from EmployeeRole where EmployeeID = '${id}'`
    return db.load(sql);
}
exports.saveEmployeeInfo = (entity) => { 
    var currentTime = moment().format("YYYY-MM-DD HH:mm:ss:SS")
    var sql = `update Employee set EmployeeName = N'${entity.EmployeeName}', Birthday =  '${entity.Birthday}',
    Phone = '${entity.Phone}', Address = '${entity.Address}', ModifyDate = '${currentTime}' where EmployeeID = '${entity.EmployeeID}'`;
    console.log(sql);
    return db.insert(sql);
}

exports.getTicketID = () => { 
    var sql = `select top 1 TicketTypeID from TicketType order by TicketTypeID desc`;
    return db.load(sql);
}
exports.addGame = (entity, latestID) => {
    const code = 'TT0' + (latestID+1);
    console.log('cái code: ',code);
    var sql = `insert into TicketType (TicketTypeCode, TicketTypeName, Description, IsUsed, ImageURL)
    values ('${code}', N'${entity.gameName}', N'${entity.gameNote}', '${true}', '${entity.gameImgName}')
    `
    return db.load(sql);
}

exports.addAdultTicket = (entity, latestID) => {
    const adultTicket = 'Người lớn - ' + entity.gameName;
    console.log('check tên vé người lớn: ', adultTicket)
    var sql = `insert into Ticket (TicketName, CustomerTypeID, TicketTypeID, Price, Description, IsUsed)
    values (N'${adultTicket}', '1', '${latestID}', '${entity.gameAdultPrice}',
    N'${entity.gameNote}', '${true}')
    `;
    return db.insert(sql);
}

exports.addChildrenTicket = (entity, latestID) => {
    const childrenTicket = 'Trẻ em - ' + entity.gameName;
    console.log('check tên vé trẻ em: ', childrenTicket)
    var sql = `insert into Ticket (TicketName, CustomerTypeID, TicketTypeID, Price, Description, IsUsed)
    values (N'${childrenTicket}', '2', '${latestID}', '${entity.gameChildrenPrice}',
    N'${entity.gameNote}', '${true}')
    `;
    return db.insert(sql);
}