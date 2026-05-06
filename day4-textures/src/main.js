//lookAt 
// makes an object continuously face toward a particular point/direction
/*

Camera

Camera decides:

“WHAT should be seen?”

It defines:

viewpoint
perspective
visible area

Think:

human eye
movie camera lens

It DOES NOT draw anything.

Renderer

Renderer decides:

“HOW do we actually display it on screen?”

It:

takes scene + camera
calculates lighting
calculates perspective
converts 3D into 2D pixels

Think:

GPU painter
film projector
Simple analogy
Scene

= stage

Meshes

= actors

Camera

= cameraman deciding angle

Renderer

= machine converting recording into visible movie

*/


import './style.css'

import * as THREE from "three"

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//creating a scene
const scene = new THREE.Scene()

//camera
const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

camera.position.z=2

//creating a light and its source
const light = new THREE.DirectionalLight( 'white' , 2 );
// directional light behaves like sunlight (same direction everywhere)

light.position.set(1,1,1)
// light comes diagonally from front-top-right

scene.add( light );

const light2 = new THREE.DirectionalLight( 'white' );
// second light softens dark areas so object details stay visible

light2.position.set(-1,-1,-1)
// opposite direction lighting = fill light

scene.add( light2 );

const helper = new THREE.DirectionalLightHelper( light, 2 );
// helper visually shows where the light direction is pointing

scene.add( helper );

// creating the cube
const geometry = new THREE.BoxGeometry(1,2,3)
// box dimensions → width , height , depth

const material = new THREE.MeshPhysicalMaterial({color:"white"})
// realistic material that reacts properly to light

const mesh = new THREE.Mesh(geometry , material)

//to make ur mesh look in a particular direction , specified by an xyz coord vector : THREE.Vector3(x,y,z)
mesh.lookAt(new THREE.Vector3(0.2,0.1,0))
// object rotates itself so its front side faces this coordinate point

material.metalness=1
// fully metallic surface

material.roughness=0.5
// medium rough surface → reflections become slightly blurry

//positioning them so they don't overlap
mesh.position.x=-2
// moving object slightly left

//adding elements to the scene
scene.add(mesh )

//selecting html element
const canvas = document.querySelector('canvas')

const renderer = new THREE.WebGLRenderer({canvas:canvas})
// renderer converts 3D math/data into actual pixels on your screen

renderer.setSize(window.innerWidth,window.innerHeight)

const controls = new OrbitControls( camera, renderer.domElement )
// allows dragging, zooming and rotating scene using mouse

const mouse= { x:0,y:0}
// object to store mouse position values

window.addEventListener('mousemove',function(e){

    mouse.x = e.clientX/window.innerWidth
    // converts mouse x into normalized value between 0 and 1

    mouse.y = e.clientY/window.innerHeight 
    // converts mouse y into normalized value between 0 and 1
})

window.addEventListener('resize' ,  function(e){

    camera.aspect = window.innerWidth / window.innerHeight
    // updates camera proportions for new screen size

    renderer.setSize(window.innerWidth, window.innerHeight)
    // updates renderer size too

    camera.updateProjectionMatrix()
    // recalculates camera math so scene doesn’t stretch/squeeze
})

let clock = new THREE.Clock()

function animate(){

    window.requestAnimationFrame(animate);

    controls.update();

    mesh.lookAt(new THREE.Vector3(mouse.x - 0.5 , -mouse.y +0.5 , 1))
    
    // object keeps turning toward mouse position
    // -0.5 and +0.5 shift center from top-left to actual screen center
    // y is inverted because browser y increases downward
    // z=1 keeps target point slightly in front of object

    renderer.render(scene,camera)
}

animate()


/*

```text
mesh.lookAt(new THREE.Vector3(mouse.x - 0.5 , -mouse.y +0.5 , 1))

Ye line basically object ko bol rahi hai:

“Jidhar mouse hai udhar apna muh ghumao.”

But problem ye hai ki browser ke mouse coordinates aur 3D world ke coordinates same system use nahi karte.

-----------------------------------

1. mouse.x - 0.5

Mouse ki x value normally:
0 → 1 tak hoti hai

0 = extreme left
1 = extreme right

Lekin 3D world me center usually:
0 hota hai

Toh agar hum directly mouse.x use karein:
object properly center-based move nahi karega.

Isliye:
mouse.x - 0.5

kar diya.

Ab values ban gayi:

left  = -0.5
center = 0
right = +0.5

Matlab:
humne coordinate system ko center-based bana diya.

-----------------------------------

2. -mouse.y + 0.5

Browser me y-axis ulta hota hai.

Browser:
top = 0
bottom = positive

Lekin 3D world me:
up = positive
down = negative

Toh agar minus nahi lagate:
mouse upar le jaoge aur object neeche dekhega.

Isliye:
-mouse.y

karke y-axis invert kari gayi.

Fir:
+0.5

karke usko bhi center-based bana diya.

-----------------------------------

3. z = 1

Vector3(x,y,z)

me z depth hoti hai.

Agar z = 0 rakhte:
target point same flat plane pe hota.

z = 1 dene ka matlab:
“thoda saamne dekho”

Ye direction calculation ko stable aur natural banata hai.

-----------------------------------

4. Ye animate() ke andar kyun hai?

Kyuki mouse continuously move ho raha hai.

Agar lookAt sirf ek baar likhte:
object sirf ek baar rotate hota.

Animate loop ke andar:
har frame mouse ki nayi position milti hai
aur object continuously us taraf face karta rehta hai.

Isliye smooth tracking effect aata hai.
```






Step 1 — Create the universe
const scene = new THREE.Scene()

You first create:

the empty 3D world

Without scene:

nothing exists
Step 2 — Create eyes for the world
const camera = new THREE.PerspectiveCamera(...)

You decide:

from where the world will be viewed
how wide vision is
what range is visible

Without camera:

world exists but nobody can see it
Step 3 — Create visible objects

You need:

Shape
geometry
Surface appearance
material
Combine both
mesh

Mesh = actual visible object.

Step 4 — Add lighting

Without light:

realistic materials look black/dark

So you place lights:

DirectionalLight

This creates:

highlights
shadows
depth perception
Step 5 — Put objects into scene
scene.add(mesh)

Until added:

object exists in memory only
not inside world
Step 6 — Create renderer
const renderer = new THREE.WebGLRenderer()

This is the MOST misunderstood part.

Renderer’s job:

convert invisible 3D math into visible screen pixels

Without renderer:

scene exists
camera exists
objects exist
but NOTHING is drawn



*/




