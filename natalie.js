//natalie8 values 
let img; 
let cnv; 
function preload(){
  img = loadImage('natalie.jpeg');
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
        rotate(radians(150))
	    noFill();
	    stroke(color(c))
        strokeWeight(random(5));
        //point(xPos,yPos);
        strokeWeight(random(3));
	    curve(xPos, yPos, sin(xPos) * random(60), cos(xPos) * sin(xPos) * random(90), random(10), random(80), cos(yPos) * sin(yPos) * random(140), cos(xPos) * sin(xPos) * 50)
	    pop();
	  }
	}
}
