var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    message: String,
    scope: String,
    token: String,
    listener: {},
    data: {},
    sucessfullySent: Boolean,
    created: { type: Date }
});

var Message = mongoose.model('message', messageSchema);

module.exports = Message;
