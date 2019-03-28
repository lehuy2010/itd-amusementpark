var db = require ('../fn/mssql-db')
var moment = require('moment')
console.log("đây là vị trí file REPO ");
exports.xoa_dau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/ - /g, ";")
    return str;
}
exports.loadType = ()  => {
    var sql = 'select TicketName from Ticket';
    return db.load(sql);
}


exports.findPrice = params => {
    var sql  = `select Price from Ticket where TicketName = N'${params.TicketType}'`;
    return db.load(sql);
}


exports.transactionInsert = (ticketType, ticketAmount) => { 
    var currentTime = moment().format("YYYY-MM-DD HH:mm:ss")
    var totalTicketPrice = ticketAmount * ticketType
    var sql = `insert into Transactions(EmployeeID, Price, TransactionDate, TotalPrice) values
    ('${1}','${totalTicketPrice}','${currentTime}','${totalTicketPrice}')`
    return db.insert(sql);
}
exports.getTransactionID = () => {
    var getTransID_SQL = 'select top 1 TransactionID from Transactions order by TransactionID desc'
    return db.load(getTransID_SQL);
}

exports.getTicketID = TicketType => { 
    var getTicketID_SQL = `select TicketID, Price from Ticket where TicketName = N'${TicketType}'`
    return db.load(getTicketID_SQL);
}

exports.detailTransactionInsert = (TransIDNumber, TicketIDNumber, TicketPrice, StartDate, TicketAmount) => {  // lấy hàng cuối cùng trong bảng Transactions
    var TicketCodeSample = 'ticket code sample';
    var CreateDate = moment(StartDate).add(1,"day");
    var ExpireDate = CreateDate.format("YYYY-MM-DD HH:mm:ss")
    
    for(let Ordinal = 1; Ordinal <= TicketAmount; Ordinal ++ )
    {
        var ArrayToCreateQR = 
        [`'${TransIDNumber}'-'${Ordinal}';`]

        var TransDetailInsert_SQL = 
        `
        insert into DetailTransaction 
        (TransactionID, Ordinal, TicketCode, TicketID, TicketPrice, CreateDate, ExpiryDate, CounterCode)
        values (
        '${TransIDNumber}', '${Ordinal}', '${TicketCodeSample}','${TicketIDNumber}','${TicketPrice}',
        '${StartDate}', '${ExpireDate}','${'01'}' )
        `
        console.log("==== TEST SQL: " + ArrayToCreateQR);
        
        db.insert(TransDetailInsert_SQL);
    }
      // đây là object chứa các thuộc tính để gắn lại nhét vào Ticket Code
    return TransIDNumber
    
}


exports.getID = e => { 
     var sql = `select CustomerTypeID, TicketTypeID from Ticket where TicketName = N'${e}'`
     console.log('câu sql trong hàm getID: ')
     console.log(sql);
     return db.load(sql);
}


