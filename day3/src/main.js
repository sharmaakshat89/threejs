//mesh basic material : without shadows , so looks simple/basic bitch
// mesh standard material : 3d with shadows , so looks solid and polished




import './style.css' // importing css so our canvas/page looks styled (even if minimal)

import * as THREE from "three" // importing the entire three.js library so we can use its 3D features

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

// creating the cube
const cubegeo = new THREE.BoxGeometry(1,1,1) // defining the shape of cube (width, height, depth)
const cubemat = new THREE.MeshBasicMaterial({color:"red" , wireframe:true}) // defining how it looks (simple color, no lighting)
const cube = new THREE.Mesh(cubegeo,cubemat) // combining shape + material to make a visible object

// creating the sphere
const spheregeo = new THREE.SphereGeometry(1,20,20) // defining a sphere (radius, smoothness in width & height)
const spheremat = new THREE.MeshBasicMaterial({color:"pink" , wireframe:true}) // simple color material
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


let clock = new THREE.Clock()

function animate(){
    window.requestAnimationFrame(animate); // this keeps calling animate again n again for each frame (like a loop for smooth motion)
    cube.rotation.y = clock.getElapsedTime()*6 // rotating cube slightly every frame (by equating it with time elapsed u ensure it rotates at the same speed for all screens)
    sphere.rotation.y = clock.getElapsedTime()*2 // rotating sphere slightly every frame
    //rendering the scene 
    renderer.render(scene,camera) // telling three.js: "draw the "scene" from "camera" 's pov
}

animate() // starting the animation loop













/*
// to have common fps on different screens with diff fps
// we first introduce clock outside the animate function


let clock = new THREE.Clock()

function animate(){
    window.requestAnimationFrame(animate); // this keeps calling animate again n again for each frame (like a loop for smooth motion)
    cube.rotation.y = clock.getElapsedTime()*12 // rotating cube slightly every frame (by equating it with time elapsed u ensure it rotates at the same speed for all screens)
    sphere.rotation.y = clock.getElapsedTime()*12 // rotating sphere slightly every frame
    //rendering the scene 
    renderer.render(scene,camera) // telling three.js: "draw the "scene" from "camera" 's pov
}

animate() // starting the animation loop


*/