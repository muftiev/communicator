var express = require("express");
var logfmt = require("logfmt");
var http = require("http");
var app = express();
var mongoose = require('./mngse');



app.use(logfmt.requestLogger());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs-locals'));

app.use(express.bodyParser());
app.use(express.cookieParser());

var mStore = require('./mngse/store');
app.use(express.session({
    secret: 'chat-secret',
    key: 'sid',
    cookie: {
        "path": "/",
        "httpOnly": true,
        "maxAge": null
    },
    store: mStore
}));

app.use(require("less-middleware")({src: __dirname + "/public"}));
app.use(express.static(__dirname + '/public'));

require('./rout')(app);

app.use(function(err, req, res, next) {
    if (app.get('env') == 'development') {
        if(err.message){
            res.send({type: 'error', message: err.message});
        }else{
            var errorHandler = express.errorHandler();
            errorHandler(err, req, res, next);
        }
    } else {
        res.send(500);
    }
});

var port = Number(process.env.PORT || 5000);
var server = http.createServer(app);
server.listen(port, function() {
  console.log("Listening on " + port);
});
var chatServer = require('./server');
chatServer.listen(server);
app.set('io', chatServer);