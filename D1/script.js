

const scene = new THREE.Scene(); // Three is threejs and scene is the world we create

const camera = new THREE.PerspectiveCamera( 75 /*this is field of view , lower is narrower */,
      window.innerWidth / window.innerHeight, /* aspect ratio of the scene u r creating*/
      0.1,/* near point */
      20 /*far point */);

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); //dimensions and the hollow shape
const material = new THREE.MeshBasicMaterial( { color: "pink" , wireframe:true} ); // how u encloth it
const cube = new THREE.Mesh( geometry, material ); // mixing geometry (shape ) and material ( clothes) makes cube
cube.position.x=1 //change in cube's position in all three axis
cube.position.y=1
cube.position.z=1

cube.scale.z=1 //increasing dimesion in any axis, here 1 so no diff

scene.add( cube );//now add this cube to the scene

camera.position.z = 5; // asking the camera to move back 5 points

const canvas = document.querySelector("canvas") // where it will be rendered by the renderer
const renderer = new THREE.WebGLRenderer({canvas:canvas}); // this renders the scene as seen by the camera
renderer.setSize( window.innerWidth, window.innerHeight ); // same like the camera

document.body.appendChild( renderer.domElement );

function animate( time ) {
  window.requestAnimationFrame(animate)
  cube.rotation.x = time / 2000; //rotating our cube on both axis
  cube.rotation.y = time / 1000;
  renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );
