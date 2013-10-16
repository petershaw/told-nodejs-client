var   assert 		= require("assert")
	, chai 			= require("chai")
	, _				= require("underscore")
	;

describe('Tell with tags as string', function(){
	var told; 
	
	before(function(done){
		conf = {
			url: "test://"
		};
		told = require('../index')(conf);
		done();
	});

	after(function(done){
		delete told;
		done();
	});
	
 	it('should return a tag array inside the message with one tag', function(){
 		var result = told.tell("This is a test message", "test", "Honigkuchen");
    	chai.expect(result).to.have.property('tags');
    	chai.expect(result.tags).to.be.an.instanceof(Array);
    	chai.expect(result.tags).to.include("Honigkuchen");

 	});

 	it('should return a tag array inside the message with two tags', function(){
 		var result = told.tell("This is a test message", "test", "Honigkuchen,Zuckerschlecken");
    	chai.expect(result).to.have.property('tags');
    	chai.expect(result.tags).to.be.an.instanceof(Array);
    	chai.expect(result.tags).to.include("Honigkuchen");
		chai.expect(result.tags).to.include("Zuckerschlecken");
 	});
 	
});

describe('Tell with tags as Array', function(){
	var told; 
	
	before(function(done){
		conf = {
			url: "test://"
		};
		told = require('../index')(conf);
		done();
	});

	after(function(done){
		delete told;
		done();
	});
	
 	it('should return a tag array inside the message with one tag', function(){
 		var result = told.tell("This is a test message", "test", ["Honigkuchen"]);
    	chai.expect(result).to.have.property('tags');
    	chai.expect(result.tags).to.be.an.instanceof(Array);
    	chai.expect(result.tags).to.include("Honigkuchen");

 	});

 	it('should return a tag array inside the message with two tags', function(){
 		var result = told.tell("This is a test message", "test", ["Honigkuchen","Zuckerschlecken"]);
    	chai.expect(result).to.have.property('tags');
    	chai.expect(result.tags).to.be.an.instanceof(Array);
    	chai.expect(result.tags).to.include("Honigkuchen");
		chai.expect(result.tags).to.include("Zuckerschlecken");
 	});
 	
});