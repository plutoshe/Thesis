var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var face = require('./routes/face')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'jade');
app.set('view engine', 'jade');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.register('.html', require('jade'));


app.use('/', routes);
app.use('/users', users);

app.post('/getRecentFace', face);
app.post('/newface', face)

app.post('/refresh', users);
app.post('/addFaceToPersonbypost', users);
app.post('/addFaceToPersonbypostandurl', users);
app.post('/getImage', users);
app.post('/getPointedfaceInfo', users)


app.get("/faceset/get_info", users)
app.get('/train/search', users)
app.post('/detectImg', users)
app.post('/createFaceset', users)
app.post('/addFaceToFaceset', users)
// app.post('/getImage', users);
// app.get('/test', users);
app.get('/upload', users);

app.post('/info/get_session', users)
app.get('/compare', users);
app.get('/detect', users);
app.get('/addFaceToPerson', users);
app.get('/getGroupInfo', users);
app.post('/createPerson', users);
app.get('/addPersonToGroup', users);
app.get('/createGroup', users);
app.get('/getGroupList', users);
app.get('/getPersonList', users);
app.post('/getPersonInfo', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
