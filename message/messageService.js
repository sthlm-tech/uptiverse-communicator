var Listener = require("./Listener");
var Message = require("./Message");
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
				var url = item.url;
				var data = input.data;
				request
				 .post(url)
				 .send(data)
				 .set('Authorization', token)
				 .end(function(err, response){
					 var message = new Message();

					 message.message = input.message;
					 message.scope = input.scope;
					 message.token = token;
					 message.listener = item;
					 message.data = data;
					 message.sucessfullySent = response.ok;
					 message.created = new Date();

					 message.save(function(err, createdMessage){
						 if(err){console.log(err);}
						 deferred.resolve();
					 });

					});

			}

		});
		//deferred.resolve();
		return deferred.promise;
	}



}
module.exports = new MessageService();
