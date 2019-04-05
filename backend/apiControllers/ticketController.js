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
 
    ticketRepo.findPrice(info)
        .then(priceResult => {
            var GiaVe = priceResult[0].Price;
            var SoLuongVe = info.Amount
            ticketRepo.transactionInsert(GiaVe, SoLuongVe, info.Phone)   //insert vào bảng Transactions
            .then(() => {

                ticketRepo.getTransactionID().then(id => {
                    var TransIDNumber = id[0].TransactionID;

                    ticketRepo.getTicketID(info.TicketType).then(result => {
                        var TicketIDNumber = result[0].TicketID
                        var TicketPrice = result[0].Price
                        
                        
                        ticketRepo.detailTransactionInsert(TransIDNumber, TicketIDNumber, TicketPrice,
                            info)
                            .then (pseudoresult => {
                                res.json(pseudoresult) 
                            })
                            .catch(err => {
                                console.log(err);
                                res.statusCode = 500;
                                res.end('View error log on console.');
                            });
                        
                    })

                })

            })

        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
        
})
module.exports = router;