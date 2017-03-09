var svg = document.getElementById("vimage");
var clearButton = document.getElementById("clear");

var circleClick = function(e){
    if (this.getAttribute("fill") == "green"){
	this.remove();
	svg.appendChild(makeRandDot());
    }
    else{
	this.setAttribute("fill","green");
    }
};


var randomStart = function(){
    var max = 375;
    var min = 25;
    return Math.floor(Math.random() * (max -min + 1) + min);
};

var makeRandDot = function(){
    return makeDot(randomStart,randomStart);
};
    

var makeDot = function(x,y){

    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx",x);
    c.setAttribute("cy",y);
    c.setAttribute("r","25");
    c.setAttribute("fill","blue");

    
    c.addEventListener("click",circleClick);
    return c;
    
};



var drawDot = function(e){
    console.log("SVG: "+e.target);
    if (this == e.target){
	var dot = makeDot(e.offsetX, e.offsetY);
	svg.appendChild(dot);
    }
};


svg.addEventListener("click",drawDot,true);



var clear = function(){
    while(svg.firstChild){
	svg.removeChild(svg.firstChild);
    }
};

clearButton.addEventListener("click",clear);
