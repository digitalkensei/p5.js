//ALBUM COVER ART
//made by twitter.com/mattywillo_ for twitter.com/sableRaph's #WCCChallenge topic album cover art
//once again I procrastinated until sunday night and they gave up mid stream would you expect anything different?
//easily tweakable lines at 63-77 and 130/131

let {sin,cos} = Math;
let t = 0;
let rat = 1.;
let canvas, sh, img, gr;

//noprotect
const shSrc = [`
attribute vec3 aPosition;
varying vec2 uv;
void main() {
  gl_Position = vec4(aPosition*2.-1., 1.0);
  uv = vec2(aPosition.x, 1.-aPosition.y);
}
`,`
precision highp float;
#define PI `+Math.PI+`
#define TAU `+Math.PI*2+`
#define MAX_STEPS 200

varying vec2 uv;

uniform sampler2D texA, texB, texC;

mat2 rot(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

void main() {
  vec2 p = uv*2.-1.;
  vec3 c = vec3(0);
  vec3 c1 = texture2D(texC,uv).xyz;
  if(length(p)<.75) {
    c = vec3(
        texture2D(texA,uv+c1.x).x,
        texture2D(texA,uv+c1.y).y,
        texture2D(texA,uv+c1.z).z);
    c = texture2D(texA,uv).xyz*c1; //comment this for glitchy effect
  } else {
    c = vec3(
          texture2D(texB,uv+c1.x).x,
          texture2D(texB,uv+c1.y).y,
          texture2D(texB,uv+c1.z).z);
    c = texture2D(texB,uv).xyz*c1; //comment this for glitchy effect
  }

  gl_FragColor = vec4(c,1.);
}
`]

const ngonPoints = (n, r)=>Array(Math.ceil(n)).fill(0).map((x,i)=>([r*Math.cos(2*Math.PI*i/n), r*Math.sin(2*Math.PI*i/n)]));

const mix = (a,b,f) => {
    if(typeof a == 'number') return a * (1-f) + b * f;
    if(Array.isArray(a)) return a.map((x,i)=>mix(x,b[i],f));
    if(typeof a == 'function') return (...args) => mix(a(...args), b(...args), f)
}

let stepScale = .99;
let nScale = 4;
let lineDiv = 4;
let lineDepth = 50;
let ngS = 6;
let spread = .01;
let nFact = .01;
let ngSize = .25;
//uncomment for more variation but also worse output
// stepScale = [.99,.95,1.].find((_,i,a)=>Math.random()<1/(a.length-i));
// nScale = [2,4,8].find((_,i,a)=>Math.random()<1/(a.length-i));
// lineDiv = [2,4,8].find((_,i,a)=>Math.random()<1/(a.length-i));
// lineDepth = [50,20].find((_,i,a)=>Math.random()<1/(a.length-i));
// ngS = [6,3].find((_,i,a)=>Math.random()<1/(a.length-i));
// spread = [.01,.005].find((_,i,a)=>Math.random()<1/(a.length-i));

function draw() {
  t = t+deltaTime/3000.;
  scale(w,h);

  gr.background(0);
  gr.blendMode(ADD);
  gr.noFill();
  gr.strokeWeight(1/w);

  let pts = ngonPoints(ngS, ngSize);

  pts=pts.map((p,i,a)=>[...Array(lineDiv)].map((_,j)=>mix(p,a[(i+1)%a.length],j/lineDiv))).flat();
  for(let j = -3; j <= 3; j++)
  for(let k = -3; k <= 3; k++) {
    let off = [j*ngSize*1.5,k*ngSize*1.73+(j%2?ngSize*1.73*.5:0)]
    let mpts = pts.map(([x,y])=>[x+off[0],y+off[1]]);
    for(let i = 0; i < lineDepth; i++) {
      mpts=mpts.map(p=>mix(off,p,stepScale)).map(p=>((a=noise(...p.map(w=>w*nScale))),p.map((w,j)=>w+(j?sin:cos)(a*PI*2)*nFact)));
      gr.stroke(0,0,1);
      mpts.forEach((p,i,a)=>gr.line(...p,...a[++i%a.length]));
      gr.stroke(0,1,0);
      mpts.map(p=>p.map(w=>w*(1-spread))).forEach((p,i,a)=>gr.line(...p,...a[++i%a.length]));
      gr.stroke(1,0,0);
      mpts.map(p=>p.map(w=>w*(1+spread))).forEach((p,i,a)=>gr.line(...p,...a[++i%a.length]));
    }
  }

  // image(gr,-1,-1,2,2);
  shader(sh);
  sh.setUniform("texA", img1);
  sh.setUniform("texB", img2);
  sh.setUniform("texC", gr);
  rect(0,0,0);
  noLoop();
}

function setup() {
  w = Math.min(windowWidth, windowHeight*rat);
  h = w/rat;
  colorMode(RGB, 1, 1, 1, 1);
  setAttributes('antialias', true);
  canvas = createCanvas(w,h,WEBGL);
  sh = new p5.Shader(undefined, ...shSrc);
  gr = createGraphics(w*2,h*2);
  gr.colorMode(RGB, 1, 1, 1, 1);
  gr.translate(w,h);
  gr.scale(w,h);
}

function preload() {
	//change 'nature' and 'city' to different words for different images
  img1 = loadImage('https://source.unsplash.com/2000x2000/?geisha')
  img2 = loadImage('https://source.unsplash.com/2000x2000/?tokyo')
}

function windowResized() {
  w = Math.min(windowWidth, windowHeight*rat);
  h = w/rat;
  resizeCanvas(w, h);
}
