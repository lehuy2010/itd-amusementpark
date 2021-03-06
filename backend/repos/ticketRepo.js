var db = require ('../fn/mssql-db')
var moment = require('moment')
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
exports.loadTypeAndPrice = ()  => {

    var sql = `select TicketName,Price from Ticket where IsUsed = 'true'`;
    return db.load(sql);
}

exports.loadTicketDetail = () => {
    var sql = `
    select 
    TT.TicketTypeID as idVe,
    TT.TicketTypeName as tenVe,
    TT.Description as motaVe,
    T1.Price as adultGia,
    T2.Price as childGia,
    T1.IsUsed as adultUsed,
    T2.IsUsed as childUsed
    from TicketType as TT, Ticket as T1, Ticket as T2
    where TT.TicketTypeID = T1.TicketTypeID and TT.TicketTypeID = T2.TicketTypeID
	and T1.CustomerTypeID = 1 and T2.CustomerTypeID = 2
    `;
    return db.load(sql);

}
exports.findPrice = Type => {
    var sql  = `select Price from Ticket where TicketName = N'${Type}'`;
    return db.load(sql);
}

// HÀM NÀY CHỈ INSERT MỘT TRANSACTIONID VÀO BẢNG
// SAU NÀY SẼ XỬ LÝ THÊM PHẦN ƯU ĐÃI => TOTALPRICE LÀ GIÁ ĐÃ ÁP DỤNG ƯU ĐÃI CỦA PRICE
exports.transactionInsert = (OriginalPrice, PostPromoPrice, phoneInput) => { 
    var currentTime = moment().format("YYYY-MM-DD HH:mm:ss:SS")
    var sql = `insert into Transactions(Price, TransactionDate, TotalPrice, Phone, PaymentStatus) values
    ('${OriginalPrice}','${currentTime}','${PostPromoPrice}','${phoneInput}', 'False')`
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

exports.detailTransactionInsert = (TransIDNumber, TicketIDNumber, TicketPrice, Ordinal,TicketType, Entity) => {  // lấy hàng cuối cùng trong bảng Transactions
    var XoaDauString = xoadau(TicketType)
    var TachString = XoaDauString.split(";")
    var NewTicketType = TachString[1].concat(';',TachString[0]);
    var CreateDate = moment(Entity.Date).add(1, "day");
    var ExpireDate = CreateDate.format("YYYY-MM-DD HH:mm:ss:SS")
    var TicketCodeArray;

    var PseudoArrayToCreateQR =                 // mảng này là chưa có dòng code md5
        [`${TransIDNumber}-${Ordinal};${NewTicketType};${Entity.Date};${ExpireDate};${xoadau(Entity.Name)};${TicketPrice} VND`]

    

    var EncodedPseudo = md5(PseudoArrayToCreateQR.toString())      // encode md5 nguyên dãy trên

    

    TicketCodeArray = [PseudoArrayToCreateQR + ';' + EncodedPseudo + ';'];    // xong join 2 chuỗi lại
    
    var TransDetailInsert_SQL =
        `
            insert into DetailTransaction 
            (TransactionID, Ordinal, TicketCode, TicketID, TicketPrice, CreateDate, ExpiryDate)
            values (
            '${TransIDNumber}', '${Ordinal}', '${TicketCodeArray}','${TicketIDNumber}','${TicketPrice}','${Entity.Date}','${ExpireDate}')
            `

    
    db.insert(TransDetailInsert_SQL);

    //return Promise.resolve(TicketCodeArray)
    return TicketCodeArray
}


exports.getTicketCodeForQR = e => { 
     var sql = `select TicketCode from DetailTransaction where TicketName = N'${e}'`
     return db.load(sql);
}

exports.loadPromotion = bookDate => {
    var sql = `select * from Promotion where '${bookDate.toString()}' > FromTime and '${bookDate.toString()}' < ToTime`;
    return db.load(sql);
}

exports.findPromotionDetail = PromoID => {          // tìm thông tin của ctrinh promotion
    var sql = `select * from Promotion where PromotionID = '${PromoID}'`;
    return db.load(sql);
}

exports.insertApplyPromo = (TransID, PromoID) => {
    var sql = `insert into ApplyPromotion (TransactionID, Ordinal, PromotionID) values
    ('${TransID}','${1}', '${PromoID}')
    `;
    return db.insert(sql);
}
