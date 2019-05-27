var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var ticketCtrl = require('./apiControllers/ticketController');
var homepageCtrl = require('./apiControllers/homepage-contentController');
var adminCtrl = require('./apiControllers/adminController');
// var gamecardCtrl = require ('./apiControllers/gamecardController');
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


app.use('/ticket',ticketCtrl);
app.use('/home',homepageCtrl);
app.use('/admin',adminCtrl);
// app.use('/games', gamecardCtrl);
var port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`đồ án tốt nghiệp trên port ${port}`);
})