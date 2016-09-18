

var dictionaries = require('./dictionaries');


module.exports = (function(){


    
	
    /**
     *
     */
    var __isDefinedInDictionary = function(cat, subCat, propVerb){
	if (!cat || !subCat)return;

	var verb, isDef = false, verbs = dictionaries[cat][subCat];
	for (var i in verbs){    
	    verb = verbs[i];
	    if(propVerb && (verb.indexOf(propVerb) >= 0 || propVerb.indexOf(verb) >= 0)){
		isDef = true;
	    }
	};
	return isDef;
    };
    
    
    /**
     *
     */
    var __iteratePropositions = function(data, func){
	
	var i = data.length-1;
	var verb;
	while(i--){
	    verb = data[i] ? data[i].v : null;
	    if(verb && data[i].o){
		func.call({}, data[i]);
	    }
	}
	
    };
    
    /**
     *
     */
    var __indexObjectsForVerbs = function(data, verbs){

	var objectsInCriteria = {};
	
	verbs.forEach(function(verb){
	    
	    var y = __getVerbClass(verb);
	    if(y.type && y.c){
		objectsInCriteria = __getObjectsOfActionClass(data, objectsInCriteria, y.type, y.c);
	    }
	    
	});
	
	return objectsInCriteria;
    };
    
    
    /**
     *
     */
    var __indexVerbsFromData = function(data){
	var actions= [];
	__iteratePropositions(data, function(item){	
	    if(actions.indexOf(item.v) < 0){
		actions.push(item.v);	
	    }
	});
	return actions;
    };
    
    /**
     *
     */
    var __getObjectsOfActionClass = function(data, objectsInCriteria, type, c) {
	var cached = true;
	if (!objectsInCriteria[type]){
	    objectsInCriteria[type] = {};
	    objectsInCriteria[type][c] = [];
	    cached = false;
	}else {
	    if (!objectsInCriteria[type][c]){
		objectsInCriteria[type][c] = [];
		cached = false;
	    }
	}
	
	if(cached){return objectsInCriteria} ;
	var j = -1;
	__iteratePropositions(data, function(item){
	    var match = __isDefinedInDictionary(type, c, item.v);
	    if (match) {
		objectsInCriteria[type][c][++j] = {o : item.o};
	    }
	});
	return objectsInCriteria;
    };
    
    
    /**
     *
     */
    var __getVerbClass = function(verb){
	var criteria = {type : null, c: null, verb: null};
	var keys = Object.keys(dictionaries), subkeys;
	
	keys.forEach(function(k){
            subkeys = Object.keys(dictionaries[k]);
            subkeys.forEach(function(sb){
		dictionaries[k][sb].forEach(function(vb){
		    if(verb.indexOf(vb) >= 0 || vb.indexOf(verb) >= 0){
			criteria.type = k;
			criteria.c = sb;
			criteria.verb = vb;
		    }
		});
		
            });
	});
	
	return criteria;
    };
    
    /**
     *
     */
    var __actionClassesAssocToObject = function(obj, objectsInCriteria){
	var classes = [];
	
	var keys = Object.keys(objectsInCriteria), subkeys;
	var unique = [], uniq;
	keys.forEach(function(k){
            subkeys = Object.keys(objectsInCriteria[k]);
            subkeys.forEach(function(sb){
		objectsInCriteria[k][sb].forEach(function(o){
		    if(obj.indexOf(o.o) >= 0){
			uniq = unique.indexOf(k+sb);
			if(uniq < 0){
			    classes.push({type: k, c: sb});
			}
		    }
		});
		
            });
	});

	return classes;
    };


    return {
	iteratePropositions :__iteratePropositions,
	isDefinedInDictionary : __isDefinedInDictionary,
	indexObjectsForVerbs :__indexObjectsForVerbs,
	indexVerbsFromData : __indexVerbsFromData,
	getObjectsOfActionClass : __getObjectsOfActionClass,
	getVerbClass : __getVerbClass,
	actionClassesAssocToObject: __actionClassesAssocToObject
	
    }

})();
