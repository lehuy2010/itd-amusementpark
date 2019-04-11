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
    var AllTicketCodeArray = [];
    var TongTienFields = 0;
    console.log('CỤC INFO LÚC NÀY: ', info)
    for( let i = 0; i < info.Amount.length; i++ )
    {
        const priceResult = await ticketRepo.findPrice(info.TicketType[i])
        console.log('với i = ' + i + ' ,biến info.Amount[i] là : ' + parseInt(info.Amount[i]));
        console.log('với i = ' + i + ' ,biến info.TicketType[i] là : ' + info.TicketType[i])
        var GiaVe = priceResult[0].Price;
        var SoLuongVe = info.Amount[i]
        console.log("biến GiaVe - SoLuongVe: ", priceResult[0].Price + ' - ' + info.Amount[i])
        TongTienFields += GiaVe * SoLuongVe;
    }
    console.log('mảng chứa tiền tổng cộng của các hạng mục vé - số lượng:', TongTienFields);
       for ( let j = 0; j < parseInt(info.Amount[i]); j++ )
        {
            
             
                await ticketRepo.transactionInsert(GiaVe, SoLuongVe, info.Phone)   //insert vào bảng Transactions
            //     .then(() => {
    
            //         ticketRepo.getTransactionID().then(id => {
            //             var TransIDNumber = id[0].TransactionID;
            //             console.log('Biến TransIDNumber: ', TransIDNumber);
            //             ticketRepo.getTicketID(info.TicketType[i]).then(result => {
            //                 var TicketIDNumber = result[0].TicketID
            //                 var TicketPrice = result[0].Price
            //                 console.log('biến TicketIDNumber và TicketPrice: ', TicketIDNumber + ' - ' + TicketPrice)
                            
            //                 ticketRepo.detailTransactionInsert(TransIDNumber, TicketIDNumber, TicketPrice,
            //                     info.TicketType[i], info.Amount[i], info)
            //                     .then (pseudoresult => {
            //                         //res.json(pseudoresult) 
            //                         AllTicketCodeArray.push(pseudoresult);
            //                     })
            //                     .catch(err => {
            //                         console.log(err);
            //                         res.statusCode = 500;
            //                         res.end('View error log on console.');
            //                     });
                            
            //             })
    
            //         })
    
            //     })
    
            // })
            // .catch(err => {
            //     console.log(err);
            //     res.statusCode = 500;
            //     res.end('View error log on console.');
            // });
        }
    
   // res.json(AllTicketCodeArray);
    // findPrice(info)
    //     .then(priceResult => {
    //         var GiaVe = priceResult[0].Price;
    //         var SoLuongVe = info.Amount
    //         ticketRepo.transactionInsert(GiaVe, SoLuongVe, info.Phone)   //insert vào bảng Transactions
    //         .then(() => {

    //             ticketRepo.getTransactionID().then(id => {
    //                 var TransIDNumber = id[0].TransactionID;

    //                 ticketRepo.getTicketID(info.TicketType).then(result => {
    //                     var TicketIDNumber = result[0].TicketID
    //                     var TicketPrice = result[0].Price
                        
                        
    //                     ticketRepo.detailTransactionInsert(TransIDNumber, TicketIDNumber, TicketPrice,
    //                         info)
    //                         .then (pseudoresult => {
    //                             res.json(pseudoresult) 
    //                         })
    //                         .catch(err => {
    //                             console.log(err);
    //                             res.statusCode = 500;
    //                             res.end('View error log on console.');
    //                         });
                        
    //                 })

    //             })

    //         })

    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.statusCode = 500;
    //         res.end('View error log on console.');
    //     });
        
})
module.exports = router;