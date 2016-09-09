


var v = [ 2,4,5,6,9,3,7,1,8];
var t = [];



function parent(child){
    return Math.floor((child-1)/2);

}

function right(parent){
    return (parent*2)+2;
}


function left(parent){
    return (parent*2)+1;
}






function build (d, a, p){
    var node = d[p];
    if(null == p && a.length > 0){
        node = a.splice(-1)[0];
        d[d.length] = node;
    }
    
    
    if(d.length > 0 && node != null){
        var ni = d.indexOf(node);
        var pi = parent(ni);
        if(ni > -1 && pi> -1 && d[pi] < node){
            var tmp = d[pi];
            d[pi] = d[ni];
            d[ni] = tmp;
            
            build(d, a, pi);
        }else {
            build(d, a);
        }
    }
    
    return d;
}




console.log(build([], v.slice(0)));





function sorth (i, heap, response){
    if(!response){response = [];}
    if (i > 8){
	return;
    }
    
    response[i] = heap.splice(0,1)[0]; 
    heap = build([], heap.slice(0)); 

    sorth(++i, heap, response);
    
    return response.slice(0);
}


console.log(sorth(0, build([], v.slice(0))))
