var  _				= require('underscore')
	, request 		= require('request')
	;
	
module.exports = function(opts) {	
	
	toldclient = this;
	
	var debug = opts.debug || false;
	
	var conf = {
		url: null
	};
	var msg = {
		type: ""
		, tags: [
		]
		, message: {
		}
	};

	toldclient.version = '0.0.1';
	toldclient.transport = "http";	// fixed default
 
	/**
	 * Log a message to told log recorder
	 *
	 * scope public
	 */
	toldclient.tell = function tell(message, type, tags) {
		var mObj = _.clone(msg);

		mObj.tags = opts.defaulttags || [];
		if(typeof tags == "string"){
			mObj.tags = tags.split(',');
		}
		_.each(opts.tags, function(elm){
			mObj.tags.push(
				elm
			)
		});
		
		mObj.tags = _.unique(mObj.tags);
		
		mObj.type = type || opts.type || "";

		if(typeof message == "object"){
			if(message.type){
				mObj.type = message.type;
				delete message.type;
			}
			if(message.tags){
				_.each(message.tags, function(elm){
					mObj.tags.push(elm);
				});
				delete message.tags;
			}
			mObj.message = message;
		} else {
			mObj.message = {
				said: message
			}
		}
		if(debug) console.log("Sending message: "+ JSON.stringify(mObj));
		var putRequest = {
			url: opts.url +"/log"
			, method: "PUT"
			, json: mObj
			
		};
		if(opts.url != 'test://'){
			request.put(putRequest, function (err, r, body) {
				if(err && debug) console.log("Error while post to the told server "+ JSON.stringify(err) +", "+ JSON.stringify(putRequest));
			});
		}
		
		// for tests returning the object.
		return mObj;		
	};
	
	return(toldclient);
};
