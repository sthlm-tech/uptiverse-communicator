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
				storeMessage(item, input, token, function(){
					deferred.resolve();
				});
			}

		});
		return deferred.promise;
	}

function storeMessage(listener, input, token, callback){

	request
	 .post(listener.url)
	 .send(input.data)
	 .set('Authorization', token)
	 .end(function(err, response){
		 var message = new Message();

		 message.message = input.message;
		 message.scope = input.scope;
		 message.token = token;
		 message.listener = listener;
		 message.data = input.data;
		 message.sucessfullySent = response.ok;
		 message.created = new Date();

		 message.save(function(err, createdMessage){
			 if(err){console.log(err);}
			 callback();
		 });

		});
}

}
module.exports = new MessageService();
