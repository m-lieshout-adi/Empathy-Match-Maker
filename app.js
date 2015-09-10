var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var data = require('./src/data');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


data.copyTemplateDataIfNeeded();


app.get('/', function(req, res) {
   res.redirect('/main.html');
});

app.get('/admin', function (req, res) {
   res.redirect('/admin.html');
});

app.get('/loadMatches', function (req, res) {
   data.load(function() {
      res.send(JSON.stringify(data.getMatches()));
   });
});

app.get('/nextDay', function(req, res) {
   data.nextDay();
   data.save();

   res.send(JSON.stringify(data.getMatches()));
});

app.get('/prevDay', function(req, res) {
   data.prevDay();
   data.save();

   res.send(JSON.stringify(data.getMatches()));
});

app.get('/lastModified', function(req, res) {
   data.getLastModifiedDate(function(data) {
      res.send(JSON.stringify(data.mtime.toString()));
   });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
   app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
         message: err.message,
         error: err
      });
   });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
      message: err.message,
      error: {}
   });
});

var server = app.listen(3000, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;
