var express = require ('express')
var ticketRepo = require('../repos/ticketRepo')
var moment = require('moment')
var router = express.Router();
var nodemailer = require('nodemailer')

router.get('/', (req,res) => {
    ticketRepo.loadTypeAndPrice().then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err) ;
        res.statusCode = 500;
    })
})

router.post('/promotion', (req,res) => {
    ticketRepo.loadPromotion(req.body.bookDate)
    .then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err)
        res.statusCode = 500;
    })
})

router.post('/prices',(req,res) => {
    
    ticketRepo.findPrice(req.body.type).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
    })
})

router.post('/prices/total', async (req, res) => {
    info = {
        Amount:  req.body.selectedAmount,
        TicketType: req.body.selectedTickets,
        PromoID: req.body.selectedPromoID,
        TotalTicket: req.body.totalTicket
    }
    
    var TongTienAllFields = 0;
    var promotionDetail = 0;
    var promoPercent = 0; // 
    var promoLimit = 0; 
    var promoFlag = false; // cờ để xem có đủ dk áp dụng km chưa
    for( let i = 0; i < info.Amount.length; i++ )
    {
       
        const priceTransResult = await ticketRepo.findPrice(info.TicketType[i])
        var GiaVe = priceTransResult[0].Price;
        var SoLuongVe = info.Amount[i];
    
        TongTienAllFields += GiaVe * SoLuongVe;
        if (info.PromoID !== 0){
        promotionDetail = await ticketRepo.findPromotionDetail(info.PromoID);  
        if (info.TotalTicket  >= promotionDetail[0].MinTicketAmount && TongTienAllFields > promotionDetail[0].MinTotalPrice)
            promoFlag = true;
            promoPercent = promotionDetail[0].DiscountPercent
            
            promoLimit = (TongTienAllFields * (promoPercent / 100))
            //console.log('giá trị tiền limit lúc này: ', promoLimit)
            if (promoLimit > promotionDetail[0].MaxDiscount)
            promoLimit = promotionDetail[0].MaxDiscount
        }
    }
    TongTienAllFields = TongTienAllFields - promoLimit
     console.log('biến tongtienallfields:',TongTienAllFields);
    // return Promise.resolve(TongTienAllFields);
    res.json({
        TongTienAllFields,
        promoFlag
    });
})

router.get('/prices', (req,res) => {
    ticketRepo.loadTicketDetail().then(result => { 
        res.json(result)
    }).catch(err => {
            console.log(err);
        })
})

router.post('/submit', async (req,res) => {
    info = {
        Name: req.body.params.customerName,
        Email:  req.body.params.customerEmail,
        Phone: req.body.params.phoneInput,
        CMND: req.body.params.customerID,
        Date: req.body.params.ticketDate,
        Amount:  req.body.params.ticketNumber,
        TicketType: req.body.params.ticketType,
        TotalSum:req.body.params.ticketPriceSum
    }
    var TicketCodeArray = [];
    console.log('tại api submit, ticketType của nó là : ', req.body.params.ticketType);
    var DetailTransactionsOrdinal = 0; // Số Ordinal cho bảng DetailTransaction
    console.log('mảng chứa tiền tổng cộng của các hạng mục vé - số lượng:', info.TotalSum, info.Phone);
    await ticketRepo.transactionInsert(info.TotalSum, info.Phone)   //insert vào bảng Transactions
    
    for (let i = 0; i < info.Amount.length; i++ )
    {
        for ( let j = 0; j < parseInt(info.Amount[i]); j++ )
        {
            try {
                const ticketsResult = await ticketRepo.getTicketID(info.TicketType[i])
                
                DetailTransactionsOrdinal = await DetailTransactionsOrdinal + 1;

                const transactionResult = await ticketRepo.getTransactionID()
                var TransIDNumber = transactionResult[0].TransactionID
                
                var TicketIDNumber = ticketsResult[0].TicketID
                var TicketPrice = ticketsResult[0].Price
                
                
                const tempArray = await ticketRepo.detailTransactionInsert(TransIDNumber, TicketIDNumber, TicketPrice,
                DetailTransactionsOrdinal, info.TicketType[i], info)

                TicketCodeArray.push(tempArray);
               
            } catch(err) {
                console.log(err);
                res.statusCode = 500;
                res.end('View error log on console.');
            }
        }
    }
    res.json(TicketCodeArray);
        
})

router.post('/send', async (req,res) => {
    const information = req.body;
    console.log('tại hàm gửi mail, information là: ', information)
    
    var isPromoApply = '';
    information.emailPromoApply === true ? 
    isPromoApply = 'bạn đã đủ điều kiện cho chương trình khuyến mãi'
    : isPromoApply = 'bạn đã đủ điều kiện cho chương trình khuyến mãi'

    var isDiscount = 'đã giảm giá';

    const nextDay = moment(information.emailDate).add(1,'days').format('DD-MM-YYYY');
    var ticketPriceArr = [];
    console.log("ticket number là ", information.emailTicketNumber);
    var returnPrice;

    for(let i = 0; i < information.emailTicketNumber.length; i++){
        var returnPrice = await ticketRepo.findPrice(information.emailTicketType[i])
        ticketPriceArr.push(returnPrice[0].Price);
    }
    const transactionResult = await ticketRepo.getTransactionID()
    var TransIDNumber = transactionResult[0].TransactionID

    console.log('ctrinh khuyến mãi :', information.emailPromo);
    let transporter = nodemailer.createTransport({
        host: "smtp.googlemail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'nguyenlehuy1101@gmail.com', 
          pass: '19001560' 
        }
      });

      let info = await transporter.sendMail({
        from: '"Huy Nguyễn Lê" <nguyenlehuy1101@gmail.com>', // sender address
        to: information.emailLocation, // list of receivers
        subject: "THÔNG TIN VỀ CÁC VÉ ĐÃ ĐẶT TẠI KHU VUI CHƠI ITD AMUSEMENT PARK", // Subject line
        text: "text nguyễn lê huy", // plain text body
        html:  `
        <p>Cảm ơn bạn đã mua vé tại khu vui chơi iTD Amusement Park </p>
        <p><b> Khi đến quầy thanh toán, hãy cung cấp số điện thoại của bạn cho nhân viên để lấy vé.</b></p>
        <p style = "color:red"> Lưu ý: Vé chỉ có thể được lấy và sử dụng trước thời hạn sử dụng, sau thời gian này vé sẽ hết hạn và bị hủy.</p>
        <h3> Thông tin các vé mà bạn đã đặt mua </h3>
        <div>
                Mã gia dịch: <b>${TransIDNumber}</b> <br />
                Họ tên: <b>${information.emailName}</b> <br />
                Số điện thoại đặt mua: <b>${information.emailPhone}</b> <br/>
                Ngày mua vé : <b>${moment(information.emailDate).format('DD-MM-YYYY')}</b> <br/>
                Ngày hết hạn: <b>${nextDay}</b> <br/>
                Thông tin các vé đã mua: <br/>
                ${information.emailTicketNumber.map(function(data, index) {
                    return (`<p><b> ${data} vé ${information.emailTicketType[index]} : ${ticketPriceArr[index].toLocaleString('vi-vn')} đồng </b></p> `)})}
                Chương trình khuyến mãi: <b>${information.emailPromo}</b><br/>
               (${isPromoApply}) <br />
                Tổng cộng: <b>${information.emailTotal.toLocaleString('vi-vn')} đồng ${isPromoApply === true ? 'đã giảm giá' : ''}</b>
                
    `
      });
     console.log("Message sent: %s", info.messageId);
   res.json(info.messageId);
})
module.exports = router;