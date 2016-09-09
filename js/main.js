



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

    var templates = {
	"template-propositions" : _.template($("#item").html()),
	"template_complements" : _.template($("#comp-item").html()),
	"template_verbs" : _.template($("#action-item").html())
    }
    
    
    context.getTypeAndCategoryOfVerb = function(verb){
	var criteria = {type : null, c: null, verb: null};
	var keys = Object.keys(dictionaries), subkeys;

	keys.forEach(function(k){
            subkeys = Object.keys(dictionaries[k]);
            subkeys.forEach(function(sb){
		dictionaries[k][sb].forEach(function(vb){
		    if(verb.indexOf(vb) >= 0){
			criteria.type = k;
			criteria.c = sb;
			criteria.verb = vb;
		    }
		});
		
            });
	});
	
	return criteria;
    }
    
    
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
        

    _service.render(data, templates["template-propositions"]);
    objectsInCriteria = _service.indexObjectsForVerbs(data);    


    var reorderByCatHandler = function(e){
	e.preventDefault();
	var c = $(this).text(), type = $(this).attr("type");
	console.log(type, c);

	//var objincrit = context.getObjectsOfTypeAndCategory(type, c);
	console.log(objectsInCriteria);
    }
    
    
    $(".sel-v").on("click", function(e){
	e.preventDefault();
	var v = $(this).text();
	var y = context.getTypeAndCategoryOfVerb(v);

	//var objincrit = context.getObjectsOfTypeAndCategory(y.type, y.c);
	$("#complements").html("");
	
	objectsInCriteria[y.type][y.c].forEach(function (o){
	    var html = templates['template_complements'](o);
	    $("#complements").append(html);
	});
	
    });
    
    
    $(".sel-o").on("click", function(e){
	e.preventDefault();
	var v = $(this).text();
	
	$("#actions").html("");
	
	context.findTypesAndCatRelatedToObject(v).forEach(function (o){
	    var html = templates['template_verbs'](o);
	    $("#actions").append(html);
	});

	$(".reorderByCategory").on("click", reorderByCatHandler);
	
    });





});
