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
    return makeDot(x,y,"25","0","true");
};
    

var makeDot = function(x,y,r,dir,old){

    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx",x);
    c.setAttribute("cy",y);
    c.setAttribute("r",r);
    c.setAttribute("fill","blue");
    c.setAttribute("dir",dir);
    c.setAttribute("old",old);

    
    c.addEventListener("click",circleClick);
    return c;
    
};



var drawDot = function(e){
    console.log("SVG: "+e.target);
    if (this == e.target){
	var dot = makeDot(e.offsetX, e.offsetY,25,0,"true");
	svg.appendChild(dot);
    }
};


svg.addEventListener("click",drawDot,"true");



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
	    
	    
	    //for some reason, the test case doesn't always
	    //hold true when the circle is moving
	    //from right to left
	    if (x == svg.getAttribute("width")/2 && curCircle.getAttribute("old") == "true"){
		if (curCircle.getAttribute("r")<1){
		    curCircle.remove();
		}
		
		curCircle.setAttribute("cx", x+2);
		curCircle.setAttribute("r", r/2);

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


		
		//test case, assume new direction is 1
		var secondCircle = makeDot(x+2,y,r/2,newDir,"false");
		svg.append(secondCircle);
		
		
		//	split(curCircle);
		//I tried following DW's suggestion of making another
		//function. It didn't work...
	    }

	    
	    var xMaxBound = svg.getAttribute("width") - r;
	    var yMaxBound = svg.getAttribute("height") - r;
	    
	    if (dir== 0){
		if (y >= yMaxBound){
		    dir = 1;
		    x = x + 1.5;
		    y = y - 1;
		    curCircle.setAttribute("old","true");
		}
		if (x >= xMaxBound){
		    dir = 3;
		    x = x - 1.5;
		    y = y + 1;
		    curCircle.setAttribute("old",true);
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
		    curCircle.setAttribute("old","true");
		}
		if(y <= r){
		    dir = 0;
		    x = x + 1.5;
		    y = y + 1;
		    curCircle.setAttribute("old","true");
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
		    curCircle.setAttribute("old","true");
		}
		if (x <= r){
		    dir = 1;
		    x = x + 1.5;
		    y = y - 1;
		    curCircle.setAttribute("old","true");
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
		    curCircle.setAttribute("old","true");
		}
		if (y >= yMaxBound){
		    dir = 2;
		    x = x - 1.5;
		    y = y - 1;
		    curCircle.setAttribute("old","true");
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


	

//added a stop function/button for testing

var stop = function(){
    window.cancelAnimationFrame(rID);
};




moveButton.addEventListener("click",move);
stopButton.addEventListener("click",stop);
