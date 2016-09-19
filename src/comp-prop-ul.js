/**
 * @author Mihai-Bogdan Volosincu
 */
import React from "react";
import data from './data';
import CompPropLI from "./comp-prop-li"


export default class CompPropUL extends React.Component {


    constructor() {
	super();
	this.opened;
	let edit = {}; 
	data.forEach(function(item){
	    edit["p"+item.n] = item;
	    edit[item.n] = "edit";
	});
	
	this.state = edit;
	
    }

    edit (i, val) {
	
	if(null != this.opened){
	    let op = {};
	    op[this.opened] = "edit";
	    this.setState(op);
	}
	let st = {};
	
	if (val){
	    st[i] = "edit pop";
	    this.opened = i;
	}else {
	    this.opened = null; 
	    st[i] = "edit";
	}
	this.setState(st);
    };

    updateSub (id, s){
	let k = 'p'+id;
	let st = this.state[k];
	st.s = s ;
	this.setState(st);
    };

    updateVb (id, v){
	let k = 'p'+id;
	let st = this.state[k];
	st.v = v ;
	this.setState(st);
    };

    updateObj (id, o){
	let k = 'p'+id;
	let st = this.state[k];
	st.o = o ;
	this.setState(st);
    };
    

    
    render (){
	let self=this;
	this.editClass = "edit";
	this.items = [];	
	data.forEach(function(item){
	    let k = "p"+item.n;
	    self.items.push(<CompPropLI
			    key={item.n}
			    item={self.state[k]}
			    edit={self.state[item.n]}
			    editmode={self.edit.bind(self, item.n)}
			    updateSub={self.updateSub.bind(self)}
			    updateVb={self.updateVb.bind(self)}
			    updateObj={self.updateObj.bind(self)} />)
	});

	return ( 
            <ul id="propozi" class="list-group">
		{this.items}
	    </ul>
	);
    }
}
