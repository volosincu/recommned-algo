

/**
 *
 */
var dictionaries = {
    "action-verbs" : {
	nutrition: ["eat", "drink", "tastes", "feed"],
	movement : ["walk", "go", "hiking", "run", "grow", "makes"],
	behaviour : [ "play", "avoids" ]
    },
    "stative-verbs" : {
	opinion : ["understand", "know", "tell"],
	posession : ["have", "own"],
	emotion : ["like", "hates", "fears", "dislike", "enjoy", "scary"]
    }
    
    
}




window.context = {};

$(document).ready(function(ctx){
    var objectsInCriteria;
    
    /**
     *
    */
    context.getTypeAndCategoryOfVerb = function(verb){
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
    }
    
    /**
     *
    */
    context.findTypesAndCatRelatedToObject = function(obj){
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
    }	
    

   
    objectsInCriteria = _service.indexObjectsForVerbs(data);    
    _service.render(data, templates["template-propositions"]);
   




});
