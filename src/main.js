

var $ = require('jquery');
var data = require('./data');
var UIhandler = require('./uihandler');
var txtanalyz = require('./txtanalyz');


$(document).ready(function(ctx){

    var verbs = txtanalyz.indexVerbsFromData(data);
    var objectsInCriteria = txtanalyz.indexObjectsForVerbs(data, verbs);    

    var uihandler = new UIhandler(objectsInCriteria);
    uihandler.render();
    
});
