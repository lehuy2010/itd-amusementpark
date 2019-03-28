var express = require ('express')
var ticketRepo = require('../repos/ticketRepo')
var moment = require('moment')
var router = express.Router();

router.get('/', (req,res) => {
    ticketRepo.loadType().then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err) ;
        res.statusCode = 500;
    })
})

router.post('/submit', (req,res) => {
    info = {
        Name: req.body.params.customerName,
        Email:  req.body.params.customerEmail,
        Phone: req.body.params.phoneInput,
        CMND: req.body.params.customerID,
        Date: req.body.params.ticketDate,
        Amount:  req.body.params.ticketNumber,
        TicketType: req.body.params.ticketType,
    }
    console.log("vào trong api POST ");
    // ticketRepo.findPrice(info)     // đầu tiên tìm giá của loại vé đó 
    // .then(rows => {
    //     var GiaVe = rows[0].Price;
    //     var SoLuongVe = info.Amount
    //     ticketRepo.transactionInsert(GiaVe, SoLuongVe)   //insert vào bảng Transactions
    //     .then(rows1 => {
    //         ticketRepo.getID(info.TicketType)
    //         .then(result => {
    //             console.log("customerid và ticketid :  ");
    //             console.log(result[0].CustomerTypeID + ' VÀ ' + result[0].TicketTypeID) 
                  
    //         })
    //     })
    // }).catch(err => {
    //     console.log(err);
    //     res.statusCode = 500;
    // })
    
    ticketRepo.findPrice(info)
        .then(priceResult => {
            var GiaVe = priceResult[0].Price;
            var SoLuongVe = info.Amount
            ticketRepo.transactionInsert(GiaVe, SoLuongVe)   //insert vào bảng Transactions
            .then(() => {

                ticketRepo.getTransactionID().then(id => {
                    var TransIDNumber = id[0].TransactionID;

                    ticketRepo.getTicketID(info.TicketType).then(result => {
                        var TicketIDNumber = result[0].TicketID
                        var TicketPrice = result[0].Price
                        console.log("Đây là TicketID: " + TicketIDNumber);
                        console.log("Đây là giá vé đó: " + TicketPrice);
                        
                        ticketRepo.detailTransactionInsert(TransIDNumber, TicketIDNumber, TicketPrice,
                            info.Date, info.Amount)
                            .then (pseudoresult => {
                                console.log("return giả" + pseudoresult);
                            })
                        
                    })
                })
            })
        })
        
})
module.exports = router;