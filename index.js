module.exports = function(opts){
	var told = require(__dirname +"/lib/toldclient")(opts)
	return told;
}
