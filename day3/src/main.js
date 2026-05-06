

import './style.css' // importing css so our canvas/page looks styled (even if minimal)

import * as THREE from "three" // importing the entire three.js library so we can use its 3D features

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; //controlling/moving  with the mouse
// ✔ OrbitControls lets you rotate, zoom, pan using mouse (camera movement tool)

//creating a scene
const scene = new THREE.Scene() // this is like an empty 3D world where we will put objects

//camera
const camera= new THREE.PerspectiveCamera(
    75, //field of view (how wide the camera can see, like human eye angle)
    window.innerWidth / window.innerHeight, // aspect ratio (keeps things from looking stretched)
    0.1, //near view (objects closer than this won’t be visible)
    100 //far view (objects farther than this won’t be visible)
)

camera.position.z=5 // moving the camera backward so we can actually see the objects

//creating a l9ght and its source
const light = new THREE.DirectionalLight( 'white' , 2 ); // color , intensity
// ✔ directional light = like sunlight (same direction everywhere, not like a bulb)

light.position.set(1,1,1) //light source position on xyz axis(coordinates)
// ✔ more precise → this mainly defines direction of light, not exact position effect

scene.add( light );

const light2 = new THREE.DirectionalLight( 'white' ,  ); // color , intensity
// ⚠️ intensity missing → defaults to 1 internally

light2.position.set(-1,-1,-1) //light source position on xyz axis(coordinates)
// ✔ second light from opposite direction → reduces harsh shadows (fill light)

scene.add( light2 );


//     TEXTURE
let textureLoader = new THREE.TextureLoader() //NEED TO DO IT ONLY ONCE
let tex =  textureLoader.load("./textureimg.jpg")

const helper = new THREE.DirectionalLightHelper( light, 2 );
// ✔ helper = visual guide so you can SEE where light is pointing (debug tool)

scene.add( helper );

// creating the cube
const cubegeo = new THREE.BoxGeometry(1,1,1) // defining the shape of cube (width, height, depth)
const cubemat = new THREE.MeshPhysicalMaterial({map:tex}) // mesh normal material doesn't need any color
// ❌ correction → this is NOT mesh normal material, this is physical material (advanced realistic lighting)

const cube = new THREE.Mesh(cubegeo,cubemat) // combining shape + material to make a visible object

cubemat.metalness=1 //increasing metalness, sheen or lustre of a metal
// ✔ 1 = fully metallic surface (like chrome/steel)

cubemat.roughness=0.5 // 0 = mirror smooth, 1 = rough matte surface (blurry reflections)
// ✔ correction → roughness is NOT reflectivity directly



// creating the sphere
const spheregeo = new THREE.SphereGeometry(1,20,20) // defining a sphere (radius, smoothness in width & height)
const spheremat = new THREE.MeshStandardMaterial({map:tex}) // simple color material
// ✔ reacts to light but less advanced than physical material

const sphere = new THREE.Mesh(spheregeo,spheremat) // combining shape + material into an object

//positioning them so they don't overlap
cube.position.x=-2 // moving cube to the left
sphere.position.x=+2 // moving sphere to the right

//adding elements to the scene
scene.add(cube , sphere) // putting both objects into our 3D world

//selecting html element
const canvas = document.querySelector('canvas') // grabbing the canvas from HTML where we will draw things
const renderer = new THREE.WebGLRenderer({canvas:canvas}) // creating a renderer (this actually draws 3D onto screen)
renderer.setSize(window.innerWidth,window.innerHeight) // making renderer fill the whole screen

//ADDING MOVEMENT

// to have common fps on different screens with diff fps
// we first introduce clock outside the animate function
// ✔ correct → using time instead of frames = consistent speed across devices

const controls = new OrbitControls( camera, renderer.domElement ) //now u can control it with ur mouse
// ✔ camera is now user-controlled (interactive scene)

let clock = new THREE.Clock()
// ✔ clock keeps track of elapsed time since start

function animate(){
    window.requestAnimationFrame(animate); // this keeps calling animate again n again for each frame (like a loop for smooth motion)

    cube.rotation.y = clock.getElapsedTime()*6 
    // ✔ rotation tied to real time → same speed on all machines

    controls.update(); //for each frame , change perspective according to the controls
    // ✔ REQUIRED for smooth damping (even if damping not explicitly set)

    sphere.rotation.y = clock.getElapsedTime()*2 // rotating sphere slightly every frame

    //rendering the scene 
    renderer.render(scene,camera) // telling three.js: "draw the "scene" from "camera" 's pov
}

animate() // starting the animation loop