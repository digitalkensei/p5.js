//fuji.js
let img; 
let cnv; 
function preload(){
  img = loadImage('Mount-Fuji.jpeg');
}
function setup() {
	cnv = createCanvas(img.width, img.height);
	let newCanvasX = (windowWidth - img.width)/2;
	let newCanvasY = (windowHeight - img.height)/2; 
	cnv.position(newCanvasX, newCanvasY);
	for(let col = 0; col< img.width; col+=2){
	  for(let row = 0; row <img.height; row+=2){
	    let xPos = col; 
	    let yPos = row;
	    let c = img.get(xPos,yPos);
	    push();
	    translate(xPos, yPos);
        //rotate(radians(1905000))
	    noFill();
	    stroke(color(c))
        strokeWeight(random(7));
        point(xPos,yPos);
        strokeWeight(random(5));
	    curve(xPos, yPos, sin(xPos) * random(6), cos(xPos) * sin(xPos) * random(9), random(1), random(8), cos(yPos) * sin(yPos) * random(14), cos(xPos) * sin(xPos) * 5)
	    pop();
	  }
	}
}
--------
//fuji3
let img; 
let cnv; 
function preload(){
  img = loadImage('Mount-Fuji.jpeg');
}
function setup() {
	cnv = createCanvas(img.width, img.height);
	let newCanvasX = (windowWidth - img.width)/2;
	let newCanvasY = (windowHeight - img.height)/2; 
	cnv.position(newCanvasX, newCanvasY);
	for(let col = 0; col< img.width; col+=2){
	  for(let row = 0; row <img.height; row+=2){
	    let xPos = col; 
	    let yPos = row;
	    let c = img.get(xPos,yPos);
	    push();
	    translate(xPos, yPos);
        rotate(radians(90500))
	    noFill();
	    stroke(color(c))
        strokeWeight(random(7));
        //point(xPos,yPos);
        strokeWeight(random(5));
	    curve(xPos, yPos, sin(xPos) * random(6), cos(xPos) * sin(xPos) * random(9), random(1), random(8), cos(yPos) * sin(yPos) * random(14), cos(xPos) * sin(xPos) * 5)
	    pop();
	  }
	}
}
