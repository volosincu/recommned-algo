

var $ = require('jquery');
var dictionaries = require('./dictionaries');


var data = require('./data');
var templates = require('./templates');
var uihandler = require('./uihandler');
var txtanalyz = require('./txtanalyz');


window.context = {};

$(document).ready(function(ctx){
        
    /**
     *
     */
    var template = templates.tmpl('proposition');
    $("#propozi").html("");
    txtanalyz.iteratePropositions(data, function(item){
	var html = template(item);
	$("#propozi").append(html);
    });
    
    
    /**
     * attach hanlers
     */
    $(".sel-v").on("click", uihandler.selectVerbHandler);
    $(".sel-o").on("click", uihandler.selectObjectHandler);
    

    var verbs = txtanalyz.indexVerbsFromData(data);
    var objectsInCriteria = txtanalyz.indexObjectsForVerbs(data, verbs);    

    console.log(verbs, objectsInCriteria);

});
