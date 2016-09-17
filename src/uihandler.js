


var $ = require('jquery');
var _service = require('./service');
var templates = require('./templates');
var dictionaries = require('./dictionaries');


/**
 *
 */
module.exports = (function (){
    

    var hmodule = {
    
     /**
     *
     */
    selectVerbHandler : function(e){
	e.preventDefault();

	
    },

    /**
     *
     */
    selectObjectHandler : function(e){
	e.preventDefault();
	var v = $(this).text();
	
	$("#actions").html("");
	
	context.findTypesAndCatRelatedToObject(v).forEach(function (o){
	    o.actions = dictionaries[o.type][o.c].toString();
	    var template = templates.tmpl('verb'),
		html = template(o);
	    $("#actions").append(html);
	});

	$(".reorderByCategory").on("click", hmodule.reorderByCatHandler);

	var va = $(this).prev().text();
	

	var y = context.getTypeAndCategoryOfVerb(va);

	$("#complements").html("");
	
	_service.getObjectsInCriteria()[y.type][y.c].forEach(function (o){
	    var template = templates.tmpl('complement'),
		html = template(o);
	    $("#complements").append(html);
	});
	
    },

    /**
     *
     */
    reorderByCatHandler : function(e){
	e.preventDefault();
	var c = $(this).text(), type = $(this).attr("type");

	_service.iteratePropositions(data, function(it){
	
	    var tc = context.getTypeAndCategoryOfVerb(it.v)
	    if(type === tc.type){
		it.rank = 2;
		if(c === tc.c){
		    it.rank = 3;
		}
	    }else {
		it.rank = 1;
	    }
	});

	data = _.sortBy(data, function(a){
	    if(!a.rank)a.rank=0;
	    return a.rank;
	});

	_service.render(data);
	
    },

 
    }


    return hmodule;

})();
