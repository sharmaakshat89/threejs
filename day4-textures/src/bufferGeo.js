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

const geometry= new THREE.BufferGeometry() // creating an empty geometry, using bufferGeometry(we will manually define its shape using points)

const vertices = new Float32Array([]) // this will store all the 3D points (x,y,z values)

// ⚠️ ISSUE HERE (explained below)
for (let i =0 ; i<=1000*3; i++){
    vertices[i] = Math.random() // filling each value with random numbers (so points appear randomly in space)
}

geometry.setAttribute('position' , new THREE.BufferAttribute(vertices ,  3)) 
// telling three.js: "take this array and treat every 3 values as one 3D point (x,y,z)"

const material = new THREE.MeshBasicMaterial({color: 'teal'}) 
// simple color material (does NOT react to light)

const mesh = new THREE.Mesh(geometry, material) 
// combining geometry + material to create a visible object

scene.add(mesh) // adding the object into our 3D world

const canvas = document.querySelector('canvas') // grabbing the canvas from HTML where we will draw things
const renderer = new THREE.WebGLRenderer({canvas:canvas}) // creating a renderer (this actually draws 3D onto screen)
renderer.setSize(window.innerWidth,window.innerHeight) // making renderer fill the whole screen

// ⚠️ OrbitControls not imported → this will break
const controls = new OrbitControls(camera , renderer.domElement) 
// lets you rotate/zoom/pan using mouse (like dragging the scene)

controls.enableDamping= true // makes movement smooth instead of instant
controls.dampingFactor = 0.05 // how smooth the slowing effect is

function animate(){
    window.requestAnimationFrame(animate); // keeps running this function every frame (smooth loop)

    // cube.rotation.y = clock.getElapsedTime()*6 
    // (commented: rotation based on time instead of frame count → more consistent speed across devices)

    // sphere.rotation.y = clock.getElapsedTime()*2 

    mesh.rotation.y += 0.01 // slowly rotating the custom geometry

    controls.update() // required when damping is enabled (updates smooth motion)

    camera.position.z -=0.01 // moving camera forward slowly (zooming into the object)

    renderer.render(scene,camera) 
    // telling three.js: "draw everything from camera’s point of view"
}

animate() // starting the animation loop