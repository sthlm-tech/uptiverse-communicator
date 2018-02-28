var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    name: String,
    message: String,
    scope: String,
    url: String,
    token: String,
    data: {},
    sucessfullySent: Boolean,
    created: { type: Date }
});

var Message = mongoose.model('message', messageSchema);

module.exports = Message;
