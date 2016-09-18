/**
 * @author Mihai-Bogdan Volosincu
 */
var _ = require("lodash");

module.exports = (function () {
        
    var getTemplate = function(id){
	return _.template(document.getElementById(id).innerHTML);
    }
    
    return {
	tmpl : getTemplate
    }
	
    
})();
