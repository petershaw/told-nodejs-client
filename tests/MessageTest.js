var   assert 		= require("assert")
	, chai 			= require("chai")
	, _				= require("underscore")
	;

var expected_A = {
	type: ""
	, tags: [

	]
	, message: {
		said: "This is a test message"
	} 
};

var expected_B = {
	type: "Test"
	, tags: [

	]
	, message: {
		said: "This is a test message"
	} 
};

var expected_C = {
	type: "Test"
	, tags: [
		"Tag"
	]
	, message: {
		said: "This is a test message"
	} 
};

var expected_D = {
	type: "Test"
	, tags: [
		"Try"
		, "Tag"
	]
	, message: {
		said: "This is a test message"
	} 
};

var expected_E = {
	type: "TestType"
	, tags: [
		"Try"
		, "Tag"
	]
	, message: {
		myKey: "This is a test message"
		, foo: "bar"
	} 
};

describe('Tell with minimal requirements and a', function(){
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
	
 	it('simple message string should return expected result A .', function(){
 		var result = told.tell("This is a test message");
    	chai.expect(result.message).to.have.property('said');
    	chai.expect(result.message).not.to.have.property('type');
    	chai.expect(result.message).not.to.have.property('tags');
    	chai.expect(result).to.have.property('type');
    	chai.expect(result).to.have.property('tags');
    	chai.expect(result.tags).to.be.an.instanceof(Array);
    	chai.expect(result.message.said).to.be.equals("This is a test message");
    	chai.expect(_.isEqual(result, expected_A)).to.be.true;
 	});

 	it('simple message string with type should return expected result B .', function(){
 		var result = told.tell("This is a test message", "Test");
    	chai.expect(_.isEqual(result, expected_B)).to.be.true;
 	});

	// false test
 	it('simple message string with type and wrong tag should not return expected result C .', function(){
 		var result = told.tell("This is a test message", "Test", "Test");
    	chai.expect(_.isEqual(result, expected_B)).not.to.be.true;
 	});
 	
 	 it('simple message string with type and one tag should not return expected result C .', function(){
 		var result = told.tell("This is a test message", "Test", "Tag");
    	chai.expect(_.isEqual(result, expected_C)).to.be.true;
 	});
 	
 	 it('simple message string with type and two tags as string should not return expected result D .', function(){
 		var result = told.tell("This is a test message", "Test", "Try,Tag");
    	chai.expect(_.isEqual(result, expected_D)).to.be.true;
 	 });
});

describe('Tell with user defined message and minimal requirements', function(){
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

 	it('should return expected result E .', function(){
// 		var result = told.tell({myKey: "This is a test message", foo: "bar"}, "TestType", "Try,Tag");
 		var result = told.tell({message: {myKey: "This is a test message", foo: "bar"}}, "TestType", "Try,Tag");
    	chai.expect(_.isEqual(result, expected_E)).to.be.true;
 	});
});

describe('Tell with full tyoe and tag defaults and a', function(){
	var told; 
	
	before(function(done){
		conf = {
			url: "test://"
			, type: "DefaultType"
			, tags: [
				"AddTag"
			]
			, defaulttags: [
				"DefaultTag"
			]
		};
		told = require('../index')(conf);
		
		done();
	});

	after(function(done){
		delete told;
		done();
	});
	
 	it('simple message string should return expected result A+defaults .', function(){
 		var result = told.tell("This is a test message");
    	chai.expect(result.message).to.have.property('said');
    	chai.expect(result.message).not.to.have.property('type');
    	chai.expect(result.message).not.to.have.property('tags');
    	chai.expect(result).to.have.property('type');
    	chai.expect(result).to.have.property('tags');
    	chai.expect(result.tags).to.be.an.instanceof(Array);
    	chai.expect(result.message.said).to.be.equals("This is a test message");
    	
		expected_ADD = {
			type: "DefaultType"
			,tags: [
    			"DefaultTag", "AddTag"
    		]
		};
    	
    	var expected_A_ = _.extend(expected_A, expected_ADD);

    	chai.expect(_.isEqual(result, expected_A_)).to.be.true;
 	});

 	it('simple message string with type should return expected result B+defaults .', function(){
 		var result = told.tell("This is a test message", "Test");
 		expected_ADD = {
			tags: [
    			  "DefaultTag", "AddTag"
    		]
		};
    	
    	var expected_B_ = _.extend(expected_B, expected_ADD);
    	chai.expect(_.isEqual(result, expected_B)).to.be.true;
 	});

 	 it('simple message string with type and one tag should not return expected result C+defaults .', function(){
 		var result = told.tell("This is a test message", "Test", "Tag");
		expected_ADD = {
			type: "Test"
			,tags: [
    			 "Tag", "AddTag"
    		]
		};

    	var expected_C_ = _.extend(expected_C, expected_ADD);
    	chai.expect(_.isEqual(result, expected_C_)).to.be.true;
 	});
 	
 	 it('simple message string with type and two tags as string should not return expected result D+defaults .', function(){
 		var result = told.tell("This is a test message", "Test", "Try,Tag");
		expected_ADD = {
			type: "Test"
			,tags: [
    			 "Try", "Tag", "AddTag"
    		]
		};
    	var expected_D_ = _.extend(expected_D, expected_ADD);
    	chai.expect(_.isEqual(result, expected_D_)).to.be.true;
 	 });
 	 
});

describe('Tell with user defined message and full defaults', function(){
	var told; 

	before(function(done){
		conf = {
			url: "test://"
			, type: "DefaultType"
			, tags: [
				"AddTag"
			]
			, defaulttags: [
				"DefaultTag"
			]
		};
		told = require('../index')(conf);
		done();
	});

	after(function(done){
		delete told;
		done();
	});
	
 	it('should return expected result E .', function(){
 		var result = told.tell({myKey: "This is a test message", foo: "bar"}, "TestType", "Try,Tag");
 		var result = told.tell({message: {myKey: "This is a test message", foo: "bar"}}, "TestType", "Try,Tag");
 		expected_ADD = {
			type: "TestType"
			,tags: [
    			 "Try", "Tag", "AddTag"
    		]
		};
		var expected_E_ = _.extend(expected_E, expected_ADD);
    	chai.expect(_.isEqual(result, expected_E_)).to.be.true;
 	});
});