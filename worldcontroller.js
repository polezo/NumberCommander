//scene to render stars only
var sceneTwo = new THREE.Scene();
var rendererTwo = new THREE.WebGLRenderer({
  antialias:true,
})
var canvasTwo = rendererTwo.domElement
canvasTwo.id = "stars"


//scene to render ship and number Enemies
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({
  alpha:true,
  antialias: true,
});
var canvas = renderer.domElement;
scene.fog = new THREE.FogExp2(0x000000,0.01);

//primary/only camera
var camera = new THREE.PerspectiveCamera(
  60, 
  window.innerWidth/window.innerHeight, 
  1, 
  1000);
camera.position.set(0, 0, 20);


//required Module for easy/no raycast events on primary action scene
var domEvents = new THREEx.DomEvents(camera, renderer.domElement);

//append scenes to div on the DOM

document.getElementById("webGl").appendChild(canvas);
document.getElementById("webGl").appendChild(canvasTwo);

let playing = false;

//ANIMATION LOOPS

//stars animation loop

rendererTwo.setAnimationLoop(()=>{

  if (resize(rendererTwo)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  if (playing) {
  var particleSystem = sceneTwo.getObjectByName('particleSystem');
	particleSystem.geometry.vertices.forEach(particle => {
    particle.z += 0.3;
    if (particle.z >40) {
      particle.z = -10
    }
  })
  //required logic to animate individual stars, may  want to optimize

  particleSystem.geometry.verticesNeedUpdate = true;
  }
  rendererTwo.render(sceneTwo, camera);
  
});

//ship/enemies animation loop

let badGuys
let badGuys2
let badGuySpeed = 0.19

renderer.setAnimationLoop(() => {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  //lasers animate

  if (lasersFired) {
    lasers.position.z +=140;
    
    if (lasers.position.z > 2600) {
      lasersFired = false;
      lasers.position.z = 330;
    }
  }

  if (playing) {
  //badguysAnimate
  
      badGuys.position.z +=badGuySpeed;
      
      if (badGuys.position.z > 15) {
        scene.remove(badGuys);
        badGuys = getEnemies(100); 
        renderExpression(expressionTwo); 

        //update active blocks from yellow to green
        badGuys2.children.forEach(child => {
          if (child.type === "Mesh") {
            child.material = getNumberMat(child.name.split("-")[1],"green")}
        })
        }
      
      badGuys2.position.z +=badGuySpeed;
      if (badGuys2.position.z > 15) {
        scene.remove(badGuys2);
        badGuys2 = getEnemies(100);
        renderExpression(expression1);
        
        //update active blocks from yellow to green
        badGuys.children.forEach(child => {
          if (child.type === "Mesh") {
            child.material = getNumberMat(child.name.split("-")[1],"green")}
        })

      }

    }
  renderer.render(scene,camera);
});

//i'm not really sure what this does but I think it's for helping mobile

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


//create stuff needed to control ship lookAt mouse

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 12), 100);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var pointOfIntersection = new THREE.Vector3();
canvas.addEventListener("mousemove", onMouseMove, false);

//ship lookat function

function onMouseMove(event){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, pointOfIntersection);
  currentShip.lookAt(pointOfIntersection);
}

//some lights for the ship

var light = new THREE.PointLight( 0xfffff, 1 );
light.position.set( 0, 7, -3 );
scene.add( light );

var light2 = new THREE.PointLight( 0xfbeee4, 1 );
light.position.set( 0, 5, 1 );
scene.add( light2 );

var light3 = new THREE.PointLight( 0xfbeee4, 1 );
light.position.set( 0, -8, -3 );
scene.add( light3 );


//create Box enemies --some game logic will need to be hooked in here

//stuff for holding game logic

let myArray = []
let solutionSpace

//function for changing color of numbers on cubes

function getNumberMat(name,color) {
  var x = document.createElement("canvas");
  var xc = x.getContext("2d");
  x.width = x.height = 128;
  xc.shadowColor = "#000";
  xc.shadowBlur = 7;

  xc.fillStyle = "black";
  xc.fillRect(0, 0, 128, 128);

  xc.fillStyle = `${color}`;
  xc.font = "60pt arial bold";
  xc.fillText(`${name}`, 10, 64);
  var xm = new THREE.MeshPhongMaterial({ map: new THREE.Texture(x), transparent: true });
  xm.map.needsUpdate = true;

  return xm
}

// function to get numbers for cubes

function getNumbersForEnemies(arr) {
    let i = Math.floor(Math.random()*(arr.length - 1))
    // arr.splice(i,1)
    return myArray.splice(i,1)
}

//box ID incrementer

let boxId = 1;

function getBox(w, h, d,distance) {
let boxNumber = getNumbersForEnemies(myArray)[0]

//make text mat with text
  var x = document.createElement("canvas");
  var xc = x.getContext("2d");
  x.width = x.height = 128;
  xc.shadowColor = "#000";
  xc.shadowBlur = 7;

  xc.fillStyle = "black";
  xc.fillRect(0, 0, 128, 128);

  //set color to green for block start if game just started

  if (distance > 50) {
    color = "yellow";
  } else {
    color = "green";
  }
  xc.fillStyle = `${color}`;
  xc.font = "60pt arial bold";
  xc.fillText(`${boxNumber}`, 10, 64);
  var xm = new THREE.MeshPhongMaterial({ map: new THREE.Texture(x), transparent: true });
  xm.map.needsUpdate = true;

  //make individual box geomentry

	var geometry = new THREE.BoxGeometry(w, h, d);
	var mesh = new THREE.Mesh(
		geometry,
		xm 
  );

  //give name to box to identify it/change material elsewhere

  mesh.name = `${boxId}-${boxNumber}`

  //add in DomEvent Click Listener on the Number Enemies
  if (boxNumber === solutionSpace) {
    domEvents.addEventListener(mesh, 'mousedown', onAttack, false);
  } else {
    domEvents.addEventListener(mesh, 'mousedown', onFriendlyFire, false);
  }
  boxId++
	return mesh;
}

//make group of enemies

function getBoxGrid(amount, separationMultiplier,distance) {
	var group = new THREE.Group();

	for (var i=0; i<amount; i++) {
		var obj = getBox(3, 1.5,3,distance);
		obj.position.x = (i * 6.3)*(Math.random()+1.2);
    obj.position.y = (i *  (separationMultiplier/4))*Math.random();
    obj.position.z = (i * (separationMultiplier/5))*Math.random();
		group.add(obj);
	}

	group.position.x = -(separationMultiplier * (amount-1))/2;
	group.position.z = -(separationMultiplier * (amount-1))/2;

	return group;
}

let expressionToggle = true;
let expression1 = []
let expressionTwo = []

function getEnemies(distance) {
  if (expressionToggle) {
    expression1 = generateExpression(operator, levelInfo)
    if (distance < 50) {
    renderExpression(expression1);
    }
    expressionToggle = !expressionToggle
  } else {
    expressionTwo = generateExpression(operator, levelInfo)
    expressionToggle = !expressionToggle
  }
  enemies = getBoxGrid(5,8.5,distance);
  enemies.position.x = (Math.random()-2.8)*10;
  enemies.rotation.x = Math.PI/2;
  enemies.position.z -=distance;
  enemies.position.y +=7;
  scene.add(enemies);
  
  //lights for enemy group

  let light = new THREE.PointLight( 0xfbeee4, 1 );
  light.position.set( 2, 7, 0 );
  let light2 = new THREE.PointLight( 0xfbeee4, 1 );
  light2.position.set( 10, 7, 0 );
  enemies.add( light );
  enemies.add( light2 );
  
  return enemies;
}

//define vars to make ship and lasers globally accessible (not best practice, should set names for them instead)

let currentShip
let lasers

//load ship and lasers

function loadShip (shipGltf) {
    var loader = new THREE.GLTFLoader();
    loader.load(shipGltf,onLoad) 
};

function onLoad ( shipGltf ) {
  scene.add( shipGltf.scene);

  const model = shipGltf.scene.children[ 0 ];

  model.scale.set(0.02,0.02,0.02)
  model.position.set(0,-4.2,5)
  currentShip = model;

//load lasers

  var loader = new THREE.ObjectLoader();
  loader.load(
    "lasers.json",
    function ( obj ) {
  currentShip.add( obj );
  lasers = currentShip.children[3];
    } ) 
      canvas.addEventListener("click", pewPew);
}

//fire lasers

function onAttack(event){
    currentShip.lookAt(event.target.getWorldPosition(pointOfIntersection))
    event.target.visible = false;
    addPoints()
  }
 
 //changeColor to red on bad hit

function onFriendlyFire(event) {
  currentShip.lookAt(event.target.getWorldPosition(pointOfIntersection))
  
  let name = event.target.name.split("-")[1] 

  event.target.material = getNumberMat(name,"red");
  
}

let lasersFired = false;

//activate laser animation

function pewPew () {
  lasersFired = true;
}

//load the actual model

loadShip('Lo_poly_Spaceship_01_by_Liz_Reddington.gltf')

//create stars particle system for star scene (scene two)

var particleGeo = new THREE.Geometry();
	var particleMat = new THREE.PointsMaterial({
		color: 'rgb(255, 255, 255)',
		size: 0.3,
		map: new THREE.TextureLoader().load('particle.jpg'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});

	var particleCount = 6000;
	var particleDistance = 48;

	for (var i=0; i<particleCount; i++) {
		var posX = (Math.random() - 0.5) * particleDistance;
		var posY = (Math.random() - 0.5) * particleDistance;
		var posZ = (Math.random() - 0.5) * particleDistance;
		var particle = new THREE.Vector3(posX, posY, posZ);
    
		particleGeo.vertices.push(particle);
	}

	var particleSystem = new THREE.Points(
		particleGeo,
		particleMat
	);
	particleSystem.name = 'particleSystem';
  sceneTwo.add(particleSystem);
  
//POINTS

  points = 0;

  function addPoints() {
    if (points < 10) {
    points++
    document.getElementById("pointsCounter").innerText = `Points: ${points}`
    } else {
      playing = false;
    }
  }