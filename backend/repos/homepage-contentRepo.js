var db = require ('../fn/mssql-db')


exports.loadCardsInformation = () => {
    var sql = 'select * from TicketType'
    return db.load(sql);
}

exports.loadCardsById = id => {
    var sql = `select * from TicketType where TicketTypeID = '${id}'`;
    return db.load(sql)
}