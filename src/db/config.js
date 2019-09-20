const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/socketio')
    .then(db => console.log('DB connected ready'))
    .catch(err => console.error(err));


mongoose.Promise = global.Promise;
module.exports = mongoose;