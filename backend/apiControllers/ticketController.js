var express = require ('express')
var ticketRepo = require('../repos/ticketRepo')
var moment = require('moment')
var router = express.Router();

router.get('/', (req,res) => {
    ticketRepo.loadTypeAndPrice().then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err) ;
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
        Name: req.body.params.customerName,
        Email:  req.body.params.customerEmail,
        Phone: req.body.params.phoneInput,
        CMND: req.body.params.customerID,
        Date: req.body.params.ticketDate,
        Amount:  req.body.params.ticketNumber,
        TicketType: req.body.params.ticketType,
    }
    var TongTienAllFields = 0;
    for( let i = 0; i < info.Amount.length; i++ )
    {
        const priceTransResult = await ticketRepo.findPrice(info.TicketType[i])
        console.log('với i = ' + i + ' ,biến info.Amount[i] là : ' + parseInt(info.Amount[i]));
        console.log('với i = ' + i + ' ,biến info.TicketType[i] là : ' + info.TicketType[i])
        var GiaVe = priceTransResult[0].Price;
        var SoLuongVe = info.Amount[i]
        console.log("biến GiaVe - SoLuongVe: ", priceTransResult[0].Price + ' - ' + info.Amount[i])
        TongTienAllFields += GiaVe * SoLuongVe;
    }
    Promise.resolve(TongTienAllFields);
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
    console.log('CỤC INFO LÚC NÀY: ', info)
    for( let i = 0; i < info.Amount.length; i++ )
    {
        const priceTransResult = await ticketRepo.findPrice(info.TicketType[i])
        console.log('với i = ' + i + ' ,biến info.Amount[i] là : ' + parseInt(info.Amount[i]));
        console.log('với i = ' + i + ' ,biến info.TicketType[i] là : ' + info.TicketType[i])
        var GiaVe = priceTransResult[0].Price;
        var SoLuongVe = info.Amount[i]
        console.log("biến GiaVe - SoLuongVe: ", priceTransResult[0].Price + ' - ' + info.Amount[i])
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
                console.log('Số transaction: ', TransIDNumber)
                var TicketIDNumber = ticketsResult[0].TicketID
                var TicketPrice = ticketsResult[0].Price
                console.log('biến TicketIDNumber và TicketPrice: ',TicketIDNumber + ' - ' + TicketPrice)
                
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
module.exports = router;