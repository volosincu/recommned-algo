/**
 * @author Mihai-Bogdan Volosincu
 */
import React from "react";


export default class CompPropLI extends React.Component {
    render (){
	const item = this.props.item;
	return (
	  <li id="{this.props.key}" class="list-group-item">
	    <div>
		{item.s}
		<a href="#" class=" sel-v">{item.v}</a>
		<a href="#" class=" sel-o">{item.o}</a><span>.</span>
	    </div>
	  </li>
	);
    }
}
