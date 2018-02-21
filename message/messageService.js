var Listener = require("./Listener");
var when = require('when');
var listener = require("./listenerService");
var request = require("superagent");

function MessageService() {
	var self = this;

	self.publish = function(input, token){
		var deferred = when.defer();
		listener.list(input)
		.then(function(list){
			for(var i = 0; i < list.length;i++){
				var item = list[i];
				request
				 .post(item.url)
				 .send(input.data)
				 .set('Authorization', token)
				 .end(function(err, response){
						if (err || !response.ok) {
							console.log(err);
							//store message for later push
						}
						else {
							// make sure that message is removed if push gets
						}
					});

			}

		});
		//deferred.resolve();
		return deferred.promise;
	}



}
module.exports = new MessageService();
