

var data = [
    {
	n: 1,
	s: 'Anna',
	v: 'is eating',
	o: 'a cookie'
    },
    {
	n: 2,
	s: 'Henry',
	v: 'drinks',
	o: 'coffe'
    },
    {
	n: 3,
	s: 'Sarah',
	o: 'a pen'
    },
    {
	n: 4,
	s: 'John',
	v: 'tells'
    },
    {
	n: 5,
	s: '',
	o: 'a drama'
    },
    {
	n : 5,
	s : 'Mary',
	v : 'plays',
	o : 'with cats'
    },
    {
	n : 6,
	s : 'Alice',
	v : 'scary',
	o : 'cats'
    },
    {
	n : 7,
	s : 'Nicu',
	v : "dislike",
	o : "rats"
    },
    {
	n : 8,
	s : 'Alina',
	v : 'eats',
	o : 'cake'
    },
    {
	n : 9,
	s : 'Marius',
	v : 'runs',
	o : 'at school'
    },
    {
	n : 10,
	s : 'Alina',
	v : 'plays',
	o : 'chess'
    },
    {
	n : 11,
	s : 'Mihai',
	v : 'go hiking',
	o : 'Sundays'
    },{
	n : 12,
	s : 'Mihai',
	v : 'drinks',
	o : 'juicy'
    },{
	n : 13,
	s : 'Andrei',
	v : 'drinks',
	o : 'wisky'
    },{
	n : 14,
	s : 'Mike',
	v : 'plays',
	o : 'on computer'
    },{
	n : 15,
	s : 'Andreas',
	v : 'drinks',
	o : 'coffee'
    },{
	n : 16,
	s : 'Claudia',
	v : 'loves',
	o : 'pandas'
    },{
	n : 17,
	s : 'Claudia',
	v : 'avoids',
	o : 'ducks'
    },{
	n : 18,
	s : 'My friends',
	v : 'grow',
	o : 'rabbits'
    },{
	n : 19,
	s : 'The Doctor',
	v : 'knows',
	o : 'the medicine'
    },
    ,{
	n : 20,
	s : 'The pacients',
	v : 'understand',
	o : 'the implications'
    },{
	n : 21,
	s : 'John',
	v : 'understands',
	o : 'very quickly'
    }
];


var dictionaries = {
    "action-verbs" : {"eat", "walk", "go", "hiking", "play", "drink", "run", "grow", "avoids"},
    "stative-verbs" : {
	opinion : {"understand", "know", "tell"},
	posession : {"have", "own"},
	emotion : {"like", "hates", "fears", "dislike"}
    }
}








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
