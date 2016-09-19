/**
 * @author Mihai-Bogdan Volosincu
 */
import React from "react";
import $ from "jquery"

export default class CompPropLI extends React.Component {

    constructor () {
	super();
	this.state = {
	    statusbar : "statusbar",
	    edit : false
	}
    };

     
    
    isBlank (val){
	if(!val || val == ""){
	    return "isBlank status";
	}
	return "isComplete status";
    };

    
    showStatus (){
	this.setState({statusbar :  "statusbar pop"});
    };

    hideStatus (){
	this.setState({statusbar :  "statusbar"});
    };

    edit(e) {
	if (this.props.edit === "edit"){
	    this.props.editmode(true);
	}else {
	    this.props.editmode(false);
	}
    };

    handleSubjectChange (id, e) {
	const s = e.target.value;
	this.props.updateSub(id, s);
    };

    handleVerbChange (id, e) {
	const v = e.target.value;
	this.props.updateVb(id, v);
    };

    handleObjectChange (id, e) {
	const o = e.target.value;
	this.props.updateObj(id, o);
    };


    render (){
	const item = this.props.item;

		
	return (
	  <li id={item.n} class="list-group-item">
	    <div
	    onClick={(event) => this.edit(event)}
	        onMouseOver={this.showStatus.bind(this)}
	        onMouseOut={this.hideStatus.bind(this)}  class="txopacity">
		<div class="txo1 txo"></div>
		<div class="txo2 txo"></div>
		<div class="txo3 txo"></div>
	    	<div class="txo4 txo"></div>
		<div class={this.state.statusbar}>
		   <div class={this.isBlank(item.o)}>o</div>
		   <div class={this.isBlank(item.v)}>v</div>
		   <div class={this.isBlank(item.s)}>s</div>
	        </div>
            </div>
	    <div>
		<span class="sel-s">{item.s} </span>
		<a href="#" class=" sel-v">{item.v} </a>
		<a href="#" class=" sel-o">{item.o}</a>
		<span>.</span>
		
	    </div>

	    <div class={this.props.edit}>
		<div class="form-group">
		<input type="text" class="form-control" maxLength="12"
	               defaultValue={item.s}
	               placeholder={"subject"}
	               onChange={this.handleSubjectChange.bind(this, item.n)}/>
		<input type="text" class="form-control" maxLength="12"
	               defaultValue={item.v}
	               placeholder={"verb"}
	               onChange={this.handleVerbChange.bind(this, item.n)}/>
		<input type="text" class="form-control" maxLength="12"
	               defaultValue={item.o}
	               placeholder={"object"}
		       onChange={this.handleObjectChange.bind(this, item.n)}/>
		</div>
	    </div>
	    
	  </li>
	);
    }
}
