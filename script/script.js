
window.onload = function (){

	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
	
	// calling the game at low frame rate
	setInterval(game, 1000/15);

}

px=py=5;	//< snake position
gs=tc=20;	//< grid size and tail count (position)
ax=ay=15;	//< apple position
xv=yv=0;	
trail = [];
tail=5;		//< tail lenght
prevEvt = null;

/*
	
	@brief Function to handle the snake and apple interactions

*/
function game () {

	px+=xv;
	py+=yv;

	// if the sake is going outside the left margin, move it to the right margin
	if (px<0)
		px = tc - 1;
	
	// if the sake is going outside the right margin, move it to the left margin
	if (px > tc - 1)
		px = 0;
	
	// if the sake is going outside the top margin, move it to the bottom margin
	if (py<0)
		py = tc - 1;

	// if the sake is going outside the bottom margin, move it to the top margin
	if (py > tc - 1)
		py = 0;

	// drawing the black rectangle for the game grid
	ctx.fillStyle ="black";
	ctx.fillRect(0,0, canv.width, canv.height);

	// drawing dynamically the snake		
	ctx.fillStyle ="lime";
	for (var i = 0; i < trail.length; i++) {
		
		ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs, gs);
	
		// reset if eating itself
		if(trail[i].x == px && trail[i].y == py)
			tail = 5;
	}

	trail.push({x:px, y:py});
	
	while(trail.length > tail){
		trail.shift();
	}

	if(ax == px && ay == py){
		tail ++;
		ax = Math.floor(Math.random()*tc); 	//< generating a position between 0 and grid width
		ay = Math.floor(Math.random()*tc);	//< generating a position between 0 and grid height
		
	}

	ctx.fillStyle="red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
		
}

function keyPush (evt) {

	switch(evt.keyCode) {
		
		case 37:
			if (prevEvt === 39)
				break;
			xv=-1;
			yv=0;
			break;
		
		case 38:
			if (prevEvt === 40)
					break;
			xv=0;
			yv=-1;
			break;
		
		case 39:
			if (prevEvt === 37)
				break;
			xv=1;
			yv=0;
			break;

		case 40:
			if (prevEvt === 38)
				break;
			xv=0;
			yv=1;
			break;


	}

	prevEvt = evt.keyCode;

}
