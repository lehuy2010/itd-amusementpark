var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var ticketCtrl = require('./apiControllers/ticketController');


var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
        
    })
});


app.use('/ticket',ticketCtrl);

var port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`đồ án tốt nghiệp trên port ${port}`);
})