told-nodejs-client
==========
---

 A client to log messates into a told log recorder.
 See <https://github.com/petershaw/told-LogRecorder> to kern more about told.

Description
----------
Sends a message to the server. Noting more, nothing less.

Usage
---------

```javascript
var told = require('told-client-js')(opts);
told.tell("A Test Message", "Error", "Connection,Database");
```
or

```javascript
var told = require('told-client-js')(opts);
message = {
	myKey_1: "foo"
	, myKey_2: "bar"
};
type = "Error";
tags = ["Connection", "Database"];
told.tell(message, type, tags);
```

and of course you can use it as one big Object:

```javascript
var told = require('told-client-js')(opts);
paylaod = {
	message: {
		myKey_1: "foo"
		, myKey_2: "bar"
	}
	, type: "Error"
	, tags: [
		"Connection"
		, "Database"
	]
};
told.tell(paylaod);
```

Configuration
---------
You HAVE TO set a *url* to your told server.

```javascript
opts = {
	url: 'http://told.mydomain.com'
}
```
 
Additional you can set one of this default options:

_To set a fixed type, if no other is set by the call itself_:

```
opts.type = "myApplication"
```

_To add some default tags. These tags will be send ALWAYS right next to the tags that are send by the call it self_:

```
opts.tags = ["beutiful", "catcontent"]
```

_To set some default tags could be overwritten by the call:_

```
opts.defaultags = ["unspecific error"]
```

### Protokoll:

As default, this client use http POST over tcp ip. 
If you want to use UDP dgram packages instead, than you have to wait for the next Version. 