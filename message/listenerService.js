var Listener = require("./Listener");
var when = require('when');
function ListenerService() {
	var self = this;


	self.list = function(data, user){
		var deferred = when.defer();
		var query = { scope: data.scope, message: data.message };
		Listener.find(query, function(err, foundListeners){
				if(err){ deferred.reject(); }
				if(foundListeners){
					deferred.resolve(foundListeners);
				}
		});
		return deferred.promise;
	}

	self.register = function(data, user){
		var deferred = when.defer();
		var query = { name: data.name, scope: data.scope, message: data.message };
		Listener.findOne(query,
			function(err, foundListener){
				if(err){ deferred.reject(); }
				var url = data.host + data.path;
				if(!foundListener){
					var listener = new Listener();
					listener.name = data.name;
					listener.scope = data.scope;
					listener.message = data.message;
					listener.url = url;
					listener.created = new Date();
					listener.updated = new Date();

					listener.save(function(err, createdListener){
						deferred.resolve(createdListener);
					});

				}
				else if(foundListener.url !== url){
					foundListener.url = url;
					foundListener.updated = new Date();
					foundListener.save(function(err, createdListener){
						deferred.resolve(createdListener);
					});
				}
				else{
					deferred.resolve();
				}
			}
		);

		return deferred.promise;
	}



}
module.exports = new ListenerService();
