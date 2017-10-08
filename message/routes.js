var App = require("ms-core");
var listener = require("./listenerService");
var message = require("./messageService");

var baseUrl = "/communicator"
module.exports = function() {


	App.Express.post( baseUrl + "/message", function (req, res) {
			message.publish(req.body, req.headers.authorization)
			.then(function(response) {
				res.send(response);
			});
	});

	App.Express.post( baseUrl + "/listener", function (req, res) {
		var body = req.body;
		body.host = req.protocol + '://' + req.headers.host;
		listener.register(req.body)
		.then(function(response){
			res.send(response);
		});
	});

	/*remove when done testing*/
	App.Express.post( baseUrl + "/reciever", function (req, res) {
		res.send();
	});

};
