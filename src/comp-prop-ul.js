/**
 * @author Mihai-Bogdan Volosincu
 */
import React from "react";
import data from './data';
import txtanalyz from './txtanalyz';
import CompPropLI from "./comp-prop-li"


export default class CompPropUL extends React.Component {
    render (){
	const items = [];
	txtanalyz.iteratePropositions(data, function(item){
	    items.push(<CompPropLI key={item.n} item={item} />)
	});

	return (
            <ul id="propozi" class="list-group">
		{items}
	    </ul>
	);
    }
}
