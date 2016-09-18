import React from "react";
import ReactDOM from "react-dom";
import CompPropUL from "./comp-prop-ul"


import $ from 'jquery';
import data from './data';
import txtanalyz from './txtanalyz';




let verbs = txtanalyz.indexVerbsFromData(data);
let objectsInCriteria = txtanalyz.indexObjectsForVerbs(data, verbs);    



console.log(objectsInCriteria);


const props = document.getElementById('comp-prop-ul');
ReactDOM.render(<CompPropUL/>, props);



