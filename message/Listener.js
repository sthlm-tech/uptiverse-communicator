var mongoose = require('mongoose');

var listenerSchema = mongoose.Schema({
    name: String,
    message: String,
    scope: String,
    url: String,
    created: { type: Date },
    updated: { type: Date }
});

var Listener = mongoose.model('listener', listenerSchema);

module.exports = Listener;
