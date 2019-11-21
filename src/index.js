import express from 'express';
import config from './conf';
import http from 'http';
import Api from './api';
import { log } from './api/middlewares/index'
import { join } from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { DefaultHandler } from './api/handlers/root'
import { onConnection } from './utilities/mqtt-client';
var mongoose = require('mongoose');

let port = config.app['port'];
let app = express();
let whitelist = Object.keys(config.whitelist).map(k => config.whitelist[k]);

var isMQTTConnected = false;
onConnection(function() {
    console.log('MQTT Client Connected..');
    isMQTTConnected = true;
})
exports.isMQTTConnected = isMQTTConnected;

app.set("port", port);
app.use(bodyParser.json({ limit: config.app['bodyLimit'] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.app['cookie_secret']));



app.use(cors({
    origin: (origin, callback) => {
        console.log(origin);
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1 || typeof origin === "undefined";
        console.log('Is IP allowed: ' + originIsWhitelisted);
        let failureResp = 'You are not authorized to perform this action';
        callback(originIsWhitelisted ? null : failureResp, originIsWhitelisted);
    }
}));

new Api(app).registerGroup();

app.use('/static', express.static(join(__dirname, 'static')));
app.use('/uploads', express.static('uploads'));

app.use('/', log, DefaultHandler);

mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.name, { useNewUrlParser: true }).then(resp => {
    if (resp) {
        console.log('Database connected')
    } else {
        console.log('Unable to connect to Database')
    }
}).catch(ex => {
    console.log('Unable to connect to Database')
    console.log(ex)
})



http
    .createServer(app)
    .on('error', function(ex) {
        console.log(ex);
        console.log('Can\'t connect to server.');
    })
    .listen(port, () => console.log(`Server Started :: ${port}`));