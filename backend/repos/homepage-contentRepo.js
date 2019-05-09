var db = require ('../fn/mssql-db')


exports.loadCardsInformation = () => {
    var sql = 'select TicketTypeName, Description, ImageURL from TicketType'
    return db.load(sql);
}