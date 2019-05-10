var express = require ('express')
var ticketRepo = require('../repos/ticketRepo')
var moment = require('moment')
var router = express.Router();
var nodemailer = require('nodemailer')
var qrcode = require ('qrcode')
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
        TicketType: req.body.selectedTickets
    }
    var TongTienAllFields = 0;
    for( let i = 0; i < info.Amount.length; i++ )
    {
       
        const priceTransResult = await ticketRepo.findPrice(info.TicketType[i])
        // console.log('với i = ' + i + ' ,biến info.Amount[i] là : ' + parseInt(info.Amount[i]));
        // console.log('với i = ' + i + ' ,biến info.TicketType[i] là : ' + info.TicketType[i])
        var GiaVe = priceTransResult[0].Price;
        var SoLuongVe = info.Amount[i]
        // console.log("biến GiaVe - SoLuongVe: ", priceTransResult[0].Price + ' - ' + info.Amount[i])
        TongTienAllFields += GiaVe * SoLuongVe;
    }
    // console.log('biến tongtienallfields:',TongTienAllFields);
    // return Promise.resolve(TongTienAllFields);
    res.json(TongTienAllFields);
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
    }
    var TicketCodeArray = [];
    var DetailTransactionsOrdinal = 0; // Số Ordinal cho bảng DetailTransaction
    var TongTienAllFields = 0;
    for( let i = 0; i < info.Amount.length; i++ )
    {
        const priceTransResult = await ticketRepo.findPrice(info.TicketType[i])
        // console.log('với i = ' + i + ' ,biến info.Amount[i] là : ' + parseInt(info.Amount[i]));
        // console.log('với i = ' + i + ' ,biến info.TicketType[i] là : ' + info.TicketType[i])
        var GiaVe = priceTransResult[0].Price;
        var SoLuongVe = info.Amount[i]
        // console.log("biến GiaVe - SoLuongVe: ", priceTransResult[0].Price + ' - ' + info.Amount[i])
        TongTienAllFields += GiaVe * SoLuongVe;
    }
    console.log('mảng chứa tiền tổng cộng của các hạng mục vé - số lượng:', TongTienAllFields);
    await ticketRepo.transactionInsert(TongTienAllFields, info.Phone)   //insert vào bảng Transactions
    
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
    var tempQRArray = [];
    var QRLength = req.body.params.ticketQR;
    for (let i = 0; i < req.body.params.ticketQR.length ; i ++  )
        {
            console.log('chuỗi qr code trong vòng lặp là: ', JSON.stringify(req.body.params.ticketQR[i]))
        }
    const output = `
    <p> Đây là mã QRCode cho các vé của khu vui chơi iTD Amusement Park mà bạn đã đặt mua </p>
    <p> Vui lòng bảo quản các mã QRCode này để đảm bảo tính bảo mật của vé của bạn. Hệ thống sẽ không chịu trách nhiệm về việc thất lạc/mất mát mã QRCode </p>
    <h3> Các mã QRCode </h3>
    <script>
        for (let i = 0; i < ${req.body.params.ticketQR.length} ; i ++  )
        {   var temp = i;
            ${JSON.stringify(req.body.params.ticketQR[temp])}
            <br>
        }
    </script>
    `;
    let transporter = nodemailer.createTransport({
        host: "smtp.googlemail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'nguyenlehuy1101@gmail.com', // generated ethereal user
          pass: '19001560' // generated ethereal password
        }
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Huy Nguyễn Lê 👻" <nguyenlehuy1101@gmail.com>', // sender address
        to: req.body.params.customerEmail, // list of receivers
        subject: "MÃ QRCODE CHO VÉ KHU VUI CHƠI ITD AMUSEMENT PARK", // Subject line
        text: "text nguyễn lê huy", // plain text body
        html: output // html body
      });
    
     console.log("Message sent: %s", info.messageId);

   res.json(info.messageId);
     
})
module.exports = router;