var db = require ('../fn/mssql-db')


exports.loadCardsInformation = () => {
    var sql = 'select * from TicketType'
    return db.load(sql);
}