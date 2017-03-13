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
    return makeDot(x,y,"25","0");
};
    

var makeDot = function(x,y,r,dir){

    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx",x);
    c.setAttribute("cy",y);
    c.setAttribute("r",r);
    c.setAttribute("fill","blue");
    c.setAttribute("dir",dir);

    
    c.addEventListener("click",circleClick);
    return c;
    
};



var drawDot = function(e){
    console.log("SVG: "+e.target);
    if (this == e.target){
	var dot = makeDot(e.offsetX, e.offsetY,25,0);
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

    
    var moveCircle = function(){


	var allCircles = document.getElementsByTagName('circle');
	console.log(document.getElementsByTagName('circle'));

	for (var i = 0; i < allCircles.length; i++){

	 
	    var curCircle = allCircles[i];
	    var x = parseInt(curCircle.getAttribute("cx"));
	   // console.log(x);
	    var y = parseInt(curCircle.getAttribute("cy"));
	    //  console.log(y);

	    var dir = parseInt(curCircle.getAttribute("dir"));
	    var r = parseInt(curCircle.getAttribute('r'));
	    
	   

	   if (x == svg.getAttribute("width")/2){
		curCircle.setAttribute("cx", x+2);
		curCircle.setAttribute("r", r/2);
		if (curCircle.getAttribute("r")<1){
		    curCircle.remove();
		}
		
	//	split(curCircle);
	    }
	    var xMaxBound = svg.getAttribute("width") - r;
	    var yMaxBound = svg.getAttribute("height") - r;
	    
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
		if(y <= r){
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
		if (y <= r){
		    dir = 3;
		    x = x - 1.5;
		    y = y + 1;
		}
		if (x <= r){
		    dir = 1;
		    x = x + 1.5;
		    y = y - 1;
		}		
		else{
		    x = x - 1.5;
		    y = y - 1;
		}
	    }
	   
	    else{
		if (x <= r){
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

	    
	    curCircle.setAttribute("cx",x);
	    curCircle.setAttribute("cy",y);
	    curCircle.setAttribute("dir",dir);
	    
	}
	
	rID = window.requestAnimationFrame( moveCircle );
    };
    moveCircle();
};


var split = function(circle){
    //if dir 0, dir 2
    //if dir 1, dir 3
    //if dir 2, dir 0
    //if dir 3, dir 1

    //idk why 5 circles are being created when they split :(

    
    var radius = parseInt(circle.getAttribute("r"));
    var x = parseInt(circle.getAttribute("cx"));
    var y = parseInt(circle.getAttribute("cy"));
    var dir = parseInt(circle.getAttribute("dir"));
    
    if (radius < 1){
	circle.remove();
    }
    circle.setAttribute("cx",x+2);
    
    var radiusHalf = radius/2;
    circle.setAttribute("r", radiusHalf);
    
    var newDir;
    if (dir == 0){
	newDir = 2;
    }

    else if (dir ==1){
	newDir = 3;
    }

    else if (dir == 2){
	newDir = 0;
    }
    else
	newDir = 1;

    var secondX;
    if (newDir == 0 || newDir == 1){
	secondX = x-2;}
    else{
	secondX = x+2;}
    svg.append( makeDot(secondX,y,radiusHalf, newDir));
    
   
    console.log(document.getElementsByTagName('circle'));
};
	

//added a stop function/button for testing

var stop = function(){
    window.cancelAnimationFrame(rID);
};




moveButton.addEventListener("click",move);
stopButton.addEventListener("click",stop);
