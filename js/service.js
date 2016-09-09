

/**
 *
 */
var _service = (function(data){


    var __private = {

	objectsInCriteria : {},
	
	/**
	 *
	 */
	getObjectsOfTypeAndCategory : function(data, objectsInCriteria, type, c) {
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
	    iteratePropositions(data, function(item){
		var match = _service.isDefinedInDictionary(type, c, item.v);
		if (match) {
		    objectsInCriteria[type][c][++j] = {o : item.o};
		}
	    });
	    return objectsInCriteria;
	},

	/**
	 *
	 */
	indexVerbsFromData : function(data){
	    var actions= [];
	    iteratePropositions(data, function(item){	
		if(actions.indexOf(item.v) < 0){
		    actions.push(item.v);	
		}
	    });
	    return actions;
	},
	
	
    };
    

    /**
     *
    */
    var iteratePropositions = function(data, func){
	
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
    var render = function(data, template){
	$("#propozi").html("");
	iteratePropositions(data, function(item){
	    var html = template(item);
	    $("#propozi").append(html);
	});

	
	/**
	 * attach hanlers
	 */
	$(".sel-v").on("click", Handler.selectVerbHandler);
	$(".sel-o").on("click", Handler.selectObjectHandler);
	
    };

    /**
     *
     */
    var indexObjectsForVerbs = function(data){
	var verbs = __private.indexVerbsFromData(data);
	var objectsInCriteria = {};
	
	verbs.forEach(function(verb){
	    
	    var y = context.getTypeAndCategoryOfVerb(verb);
	    if(y.type && y.c){
		objectsInCriteria = __private.getObjectsOfTypeAndCategory(data, objectsInCriteria, y.type, y.c);
	    }
	    
	});

	__private.objectsInCriteria = objectsInCriteria;
	return objectsInCriteria;
    };

    /**
     *
     */
    var isDefinedInDictionary = function(cat, subCat, propVerb){
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

    
    return {
	
	render : render,
	getObjectsInCriteria : function() {
	    return __private.objectsInCriteria;},
	iteratePropositions : iteratePropositions,
	indexObjectsForVerbs: indexObjectsForVerbs ,
	isDefinedInDictionary: isDefinedInDictionary
    }
    
})(data);
    
