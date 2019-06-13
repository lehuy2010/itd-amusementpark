var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var ticketCtrl = require('./apiControllers/ticketController');
var homepageCtrl = require('./apiControllers/homepage-contentController');
var adminCtrl = require('./apiControllers/adminController');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use('/ticket',ticketCtrl);
app.use('/home',homepageCtrl);
app.use('/admin',adminCtrl);

var port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`đồ án tốt nghiệp trên port ${port}`);
})