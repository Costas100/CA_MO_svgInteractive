var svg = document.getElementById("vimage");
var clearButton = document.getElementById("clear");
var moveButton = document.getElementById("move");
var stopButton = document.getElementById("stop");

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
    var x = randomStart();
    var y = randomStart();
    return makeDot(x,y);
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

//--------------------------------------------------------------------------------------



var rID = 0;


var move = function(){
    window.cancelAnimationFrame(rID);


    
    // 0 = bottom right; 1 = top right; 2 = top left; 3 = bottom left
    var dir = 0;
    
    var moveCircle = function(){
	
	var circles = document.getElementsByTagName('circle');

	for (var i = 0; i < circles.length; i++) {
	    var x = parseInt(circles[i].getAttribute("cx"));
	    console.log(x);
	    var y = parseInt(circles[i].getAttribute("cy"));
	    console.log(y);

	    var xMaxBound = svg.getAttribute("width") - 25;
	    var yMaxBound = svg.getAttribute("height") - 25;

	    
	    if (dir== 0){
		if (y >= yMaxBound){
		    dir = 1;
		    x = x + 1.5;
		    y = y - 1;
		}
		if (x >= xMaxBound){
		    dir = 3;
		    x = x - 1.5;
		    y = y + 1;
		}	
		else{
		    x = x + 1.5;
		    y = y + 1;
		}
	    }

	    else if (dir == 1){
		if (x >= xMaxBound){
		    dir = 2;
		    x = x - 1.5;
		    y = y - 1;
		}
		if(y <= 25){
		    dir = 0;
		    x = x + 1.5;
		    y = y + 1;
		}
		else{
		    x = x + 1.5;
		    y = y - 1;
		}
	    }

	    else if (dir == 2){
		if (y <= 25){
		    dir = 3;
		    x = x - 1.5;
		    y = y + 1;
		}
		if (x <= 25){
		    dir = 1;
		    x = x + 1.5;
		    y = y - 1;
		}		
		else{
		    x = x - 1.5;
		    y = y - 1;
		}
	    }
	    //last case must be dir == 3
	    else{
		if (x <= 25){
		    dir = 0;
		    x = x + 1.5;
		    y = y + 1;
		}
		if (y >= yMaxBound){
		    dir = 2;
		    x = x - 1.5;
		    y = y - 1;
		}
		else{
		    x = x - 1.5;
		    y = y + 1;
		}
	    }

	    
	    circles[i].setAttribute("cx",x);
	    circles[i].setAttribute("cy",y);
	    
	}
	
	rID = window.requestAnimationFrame( moveCircle );
    };
    moveCircle();
}



var stop = function(){
    window.cancelAnimationFrame(rID);
};








var moveAllCircles = function(){
    var allCircles = document.getElementsByTagName("circle");
    console.log(allCircles.length);
    var num = 0;
    while (num < allCircles.length){
	console.log(allCircles[num]);
	animateCircle(allCircles[num]);
	num++;
    }
	
};


moveButton.addEventListener("click",move);
stopButton.addEventListener("click",stop);
