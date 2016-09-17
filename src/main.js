

var $ = require('jquery');
var dictionaries = require('./dictionaries');


var data = require('./data');
var _service = require('./service');


window.context = {};

$(document).ready(function(ctx){
    var objectsInCriteria;
    
    /**
     *
     */
    var template = templates.tmpl('proposition');
    $("#propozi").html("");
    iteratePropositions(data, function(item){
	var html = template(item);
	$("#propozi").append(html);
    });
    
    
    /**
     * attach hanlers
     */
    $(".sel-v").on("click", uihandler.selectVerbHandler);
    $(".sel-o").on("click", uihandler.selectObjectHandler);
    
    
    objectsInCriteria = _service.indexObjectsForVerbs(data);    
    

});
