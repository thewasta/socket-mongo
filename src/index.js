const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('./db/config');
const SocketIo = require('socket.io');
const app = express();

const indexRoutes = require('./routes/routes');
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

const io = SocketIo(app.listen(app.get('port')));
io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('message', (data) => {
        console.log('io', data);
        io.sockets.emit('message', data);
    });
});
//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//route
app.use('/', indexRoutes);
