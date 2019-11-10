

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  60, 
  window.innerWidth/window.innerHeight, 
  1, 
  1000);
camera.position.set(0, 0, 20);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
// renderer.setSize(window.innerWidth/window.innerHeight);
var canvas = renderer.domElement;

document.getElementById("webGl").appendChild(canvas);

// var box = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshNormalMaterial());
// box.geometry.translate(0, 0, 0.5);
// box.scale.set(1, 1, 3);
// box.position.set(0,-4.5,10);
// scene.add(box);

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 2), 100);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
canvas.addEventListener("mousemove", onMouseMove, false);


function onMouseMove(event){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  currentShip.lookAt(pointOfIntersection);
}

renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
});

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// canvas.addEventListener("click",pewPew)

document.addEventListener("DOMContentLoaded",init)

let ctxx

function init() {
    let ctx = canvas.getContext("2d");
    ctxx = ctx
}

// function pewPew(e) {
// newDiv = document.createElement("div")
// newDiv.innerText="pew pew"
// newDiv.classList.add(".pew-pew")
// document.querySelector("body").prepend(newDiv)
// }

let currentShip

loadShip('Lo_poly_Spaceship_01_by_Liz_Reddington.gltf')

function loadShip (shipGltf) {
    var loader = new THREE.GLTFLoader();
    loader.load(shipGltf,onLoad) 
};


function onLoad ( shipGltf ) {
  scene.add( shipGltf.scene );

  const model = shipGltf.scene.children[ 0 ];
  model.scale.set(0.03,0.03,0.03)
  model.position.set(0,-5.2,-2)
  currentShip = model;
   
}

var ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, 10, -5 );
scene.add( light );

var light2 = new THREE.PointLight( 0x404040, 1, 100 );
light.position.set( 0, 10, -10 );
scene.add( light );

// function addShip(ship) {
//   return ship;
// }

