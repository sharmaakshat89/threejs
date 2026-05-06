first import  RGBE LOADER

let hdri=new RGBELoader() a 3d lit up scene

hdri.load('hrdi.canvas' it is an image,
function(hdritexture){
    hdri.mapping= THREE.hdriTexture=equirectanglularreflectionmapping({map:tex})
    scene.environment=hdriTexture
    scene.background= hdriTexture
}  )