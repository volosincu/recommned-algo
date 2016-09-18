


var $ = require('jquery');
var _ = require("lodash");
var data = require("./data");
var txtanalyz = require('./txtanalyz');
var templates = require('./templates');
var dictionaries = require('./dictionaries');


/**
 *
 */
module.exports = (function (){
    

    return function (indexedObjects){


	var clickhandlers = {
	
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
		var compl = $(this).text();
		var verb = $(this).prev().text();
		
		$("#actions").html("");

		txtanalyz.actionClassesAssocToObject(compl, indexedObjects).forEach(function (o){
		    o.actions = dictionaries[o.type][o.c].toString();
		    var template = templates.tmpl('verb'),
			html = template(o);
		    $("#actions").append(html);
		});
		
		$(".reorderByCategory").on("click", clickhandlers.reorderByCatHandler);
		

		
		
		var y = txtanalyz.getVerbClass(verb);
		
		$("#complements").html("");
		indexedObjects[y.type][y.c].forEach(function (o){
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
		
		txtanalyz.iteratePropositions(data, function(it){
		    
		    var tc = txtanalyz.getVerbClass(it.v)
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
		
		clickhandlers.render(data);
	    },

	    /**
	     *
	     */
	    render : function (){
		
		var template = templates.tmpl('proposition');
		$("#propozi").html("");
		txtanalyz.iteratePropositions(data, function(item){
		    var html = template(item);
		    $("#propozi").append(html);
		});
		
		
		/**
		 * attach hanlers
		 */
		$(".sel-v").on("click", clickhandlers.selectVerbHandler);
		$(".sel-o").on("click", clickhandlers.selectObjectHandler);
	    }
	    
	}

	return clickhandlers;
    }
    
})();
