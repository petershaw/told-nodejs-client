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

	toldclient.version = '0.0.5';
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
		} else if(typeof tags == "object"){
			mObj.tags = mObj.tags.concat(tags);
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
			if(message.message){
				mObj.message = undefined;
				_.defaults(mObj, message);
			} else {
				mObj.message = message;
			}
			//delete mObj.type;
		} else {
			mObj.message = {
				said: message
			}
		}
		if(1) console.log("Sending message: "+ JSON.stringify(mObj));
		var postRequest = {
			url: opts.url +"/log"
			, method: "POST"
			, json: mObj
			
		};
		if(opts.url != 'test://'){
			request.post(postRequest, function (err, r, body) {
				if(err && debug) console.log("Error while post to the told server "+ JSON.stringify(err) +", "+ JSON.stringify(postRequest));
			});
		}
		
		// for tests returning the object.
		return mObj;		
	};
	
	return(toldclient);
};
