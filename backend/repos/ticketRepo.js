var db = require ('../fn/mssql-db')
var moment = require('moment')
console.log("đây là vị trí file REPO ");
//var md5 = require('md5')
var md5 = require('crypto-js/md5')

function xoadau (str) {
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


exports.transactionInsert = (ticketType, ticketAmount, phoneInput) => { 
    var currentTime = moment().format("YYYY-MM-DD HH:mm:ss")
    var totalTicketPrice = ticketAmount * ticketType
    var sql = `insert into Transactions(EmployeeID, Price, TransactionDate, TotalPrice, Phone) values
    ('${1}','${totalTicketPrice}','${currentTime}','${totalTicketPrice}','${phoneInput}')`
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

exports.detailTransactionInsert = (TransIDNumber, TicketIDNumber, TicketPrice, Entity) => {  // lấy hàng cuối cùng trong bảng Transactions
    var XoaDauString = xoadau(Entity.TicketType)
    var TachString = XoaDauString.split(";")
    var NewTicketType = TachString[1].concat(';',TachString[0]);
    var CreateDate = moment(Entity.Date).add(1, "day");
    var ExpireDate = CreateDate.format("YYYY-MM-DD HH:mm:ss")
    var TicketCodeArray = [];

    for (let Ordinal = 1; Ordinal <= Entity.Amount; Ordinal++) {
        var PseudoArrayToCreateQR =                 // mảng này là chưa có dòng code md5
            [`${TransIDNumber}-${Ordinal};${NewTicketType};${Entity.Date};${ExpireDate};${xoadau(Entity.Name)};${TicketPrice} VND`]

        console.log('DÒNG CHƯA CÓ MD5: ' + PseudoArrayToCreateQR + '\n');

        var EncodedPseudo = md5(PseudoArrayToCreateQR.toString())      // encode md5 nguyên dãy trên

        console.log('DÒNG CÓ MD5: ' + EncodedPseudo + '\n');

        var ArrayToCreateQR = [PseudoArrayToCreateQR + ';' + EncodedPseudo+';']     // xong join 2 chuỗi lại

        TicketCodeArray.push(ArrayToCreateQR);
        var TransDetailInsert_SQL =
            `
                insert into DetailTransaction 
                (TransactionID, Ordinal, TicketCode, TicketID, TicketPrice, CreateDate, ExpiryDate, CounterCode)
                values (
                '${TransIDNumber}', '${Ordinal}', '${ArrayToCreateQR}','${TicketIDNumber}','${TicketPrice}','${Entity.Date}','${ExpireDate}','${'01'}')
                `
        console.log("==== TEST SQL: " + ArrayToCreateQR + '\n');

        console.log("++ TEST CÂU INSERT: " + TransDetailInsert_SQL);
        db.insert(TransDetailInsert_SQL);
    }

    return Promise.resolve(TicketCodeArray)

}


exports.getTicketCodeForQR = e => { 
     var sql = `select TicketCode from DetailTransaction where TicketName = N'${e}'`
     return db.load(sql);
}
