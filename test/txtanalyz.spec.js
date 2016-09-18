/**
 * @author bogdan volosincu
 */

var expect = require("chai").expect;
var should = require("chai").should();
var assert = require("chai").assert;

var data = require("../src/data");
var txtanalyz = require ("../src/txtanalyz");

/**
 * @description 
 *
 */
describe ('text analyser', function (){

    it("iteratePropositions should iterate over elements of data array; @params : data  callback",
       function(){
	   var i = 0;
	   txtanalyz.iteratePropositions(data, function(el){ i++; });
	   
	   expect(data.length == i);
       });
    
    it("isDefinedInDictionary should check if a verb is defined in in dictionary; @params type  cat  verb", function(){


	var make = txtanalyz.isDefinedInDictionary("action-verbs", "movement", "make"),
	    walk = txtanalyz.isDefinedInDictionary("walk"),
	    like = txtanalyz.isDefinedInDictionary("stative-verbs", "emotion", "like"),
	    have = txtanalyz.isDefinedInDictionary("stative-verbs", "posession", "have");
	
	
	make.should.be.a('boolean');
	have.should.be.a('boolean');
	like.should.be.a('boolean');

	expect(walk).to.be.an('undefined');
	expect(make).to.equal(true);
	expect(have).to.equal(true);
	expect(like).to.equal(true);
	
    });

    it("indexObjectsForVerbs(data, verbs) - should return map of complements associated within a specific type of action; Ex. complements associated with movement actions or posessive actions.",
       function(){

	   var verbs, complements, action, stative;
	   
	   verbs = txtanalyz.indexVerbsFromData(data);
	   complements = txtanalyz.indexObjectsForVerbs(data, verbs);	
	   action = complements["action-verbs"];
	   stative = complements["stative-verbs"];
	   
	   
	   //active actions
	   assert.equal(action["movement"][0].o, 'coffee',
			"\"coffee\" is an compliment in the class of movement verbs");
	   assert.equal(action["movement"][1].o, 'rabbits',
			"\"rabbits\" is an compliment in the class of movement verbs");
	   assert.equal(action["behaviour"][1].o, 'ducks',
			"\"ducks\" is an compliment in the class of behaviour verbs");
	   assert.equal(action["behaviour"][3].o, 'chess',
			"\"chess\" is an compliment in the class of behaviour verbs");
	   
	   //static actions
	   assert.equal(stative["emotion"][3].o, 'cars',
			"\"cars\" is an compliment in the class of emotion verbs");
	   assert.equal(stative["opinion"][2].o, 'the medicine',
			"\"the medicine\" is an compliment in the class of emotion verbs");
	   
       });
    
    it("indexVerbsFromData(data) - should return an array with the verbs from propositions",
       function(){
	   var verbs;
	   verbs = txtanalyz.indexVerbsFromData(data);
	   
	   assert.isArray(verbs);
       });

    
    it("getObjectsOfActionClass(data, objectsInCriteria, type, c) - should return an object",
       function(){
	   var objectsInCriteria, movement;

	   objectsInCriteria = txtanalyz.
	       getObjectsOfActionClass(data, {}, "action-verbs", "movement");
	   movement = objectsInCriteria["action-verbs"]["movement"];

	   assert.isArray(movement);
    });


    it("getVerbClass(verb) -  should return an object", function(){

	var play, playClass;

	playClass = {type : 'action-verbs', c: 'behaviour', verb: 'play'};
	play = txtanalyz.getVerbClass("play");

	assert.deepEqual(playClass, play);
    });

    it("actionClassesAssocToObject() - should return an object", function(){
	var objectsInCriteria, movClass, assocClass;

	movClass = {type : 'action-verbs', c: 'movement'};
	
	objectsInCriteria = txtanalyz.
	    getObjectsOfActionClass(data, {}, "action-verbs", "movement");
	assocClass = txtanalyz.actionClassesAssocToObject("coffee", objectsInCriteria);

	
	assert.deepEqual(movClass, assocClass[0]);
    });
    
});
