import './style.css'
import * as THREE from 'three'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'lil-gui'
import { CameraHelper, HemisphereLight } from 'three'
import gsap from 'gsap'
/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Instantiate mearth model
let earthModel;

//Load imported model 
const gltfLoader = new GLTFLoader()
gltfLoader.load('/earth.glb', (gltf) => {
     earthModel = gltf.scene.children[0]
    earthModel.scale.set(0.004,0.004,0.004)
     earthModel.position.x = -3
     earthModel.position.z = -150
     
    scene.add(earthModel)
})

//Load mercury 
let mercuryModel;
gltfLoader.load('/mercury.glb', (gltf) => {
    mercuryModel = gltf.scene.children[0]
    mercuryModel.scale.set(0.004,0.004,0.004)
    mercuryModel.position.x = -3

    scene.add(mercuryModel)
})

//Load mercury 
let venusModel;
gltfLoader.load('/venus.glb', (gltf) => {
    venusModel = gltf.scene.children[0]
    venusModel.scale.set(0.004,0.004,0.004)
    venusModel.position.z = -50
    venusModel.position.x = -3

    scene.add(venusModel)
})
//Load mars 
let marsModel;
gltfLoader.load('/mars.glb', (gltf) => {
    marsModel = gltf.scene.children[0]
    marsModel.scale.set(0.004,0.004,0.004)
    marsModel.position.z = -100
    marsModel.position.x = -3

    scene.add(marsModel)
})
//Load jupiter 
let jupiterModel;
gltfLoader.load('/mars.glb', (gltf) => {
    jupiterModel = gltf.scene.children[0]
    jupiterModel.scale.set(0.004,0.004,0.004)
    jupiterModel.position.z = 200
    jupiterModel.position.x = -3

    scene.add(jupiterModel)
})
//Load saturn 
let saturnModel;
gltfLoader.load('/saturn.glb', (gltf) => {
    saturnModel = gltf.scene.children[0]
    console.log(saturnModel)
    saturnModel.scale.set(0.004,0.004,0.004)
    saturnModel.position.x = 4

    scene.add(saturnModel)
})

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load('/textures/matcaps/1.png')

// Fonts
const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json',
(font) => {
    console.log(font)
    const textGeometry = new TextGeometry(
        'A Solar Journey',
        {
            font:font,
            size:0.5,
            height:0.2,
            curveSegments:6,
            bevelEnabled:true,
            bevelSize:0.02,
            bevelThickness:0.03,
            bevelOffset:0,
            bevelSegments:4
        }

    )
    //Bounding box
    textGeometry.center()
    const textMaterial = new THREE.MeshBasicMaterial();
    const text = new THREE.Mesh(textGeometry,textMaterial);
        //Create stars 
const starGeometry = new THREE.SphereGeometry(0.025,32,16);
const starMaterial = new THREE.MeshBasicMaterial()

for(let i = 0; i < 10000; i++) {
    
    const star = new THREE.Mesh(starGeometry, starMaterial)

    star.position.x = (Math.random() - 0.5) *70
    star.position.y = (Math.random() - 0.5) *70
    star.position.z = (Math.random() - 0.5) *1000

    scene.add(star)
}
    
    // scene.add(text)
} )


/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 51.5)
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 51.5
scene.add(camera)

//Lighting 
const ambientLight = new THREE.AmbientLight(0x333333,2);
scene.add(ambientLight)

const hemisphereLight = new THREE.HemisphereLight(0x333333,4)
scene.add(hemisphereLight)
const directionalLight = new THREE.DirectionalLight(0xffffff,2);

directionalLight.position.set(-7,0.2,-0.3)
directionalLight.intensity = 2

const directionalLight2 = new THREE.DirectionalLight(0xffffff,2);
directionalLight2.position.set(3.1,1.4,10)
directionalLight2.intensity = 3

scene.add(directionalLight,directionalLight2)
// gui.add(directionalLight.position, 'y', -10,10,0.1).name(' 1y')
// gui.add(directionalLight.position, 'x', -10,10,0.1).name('1 x')
// gui.add(directionalLight.position, 'z', -10,10,0.1).name('1 z')
// gui.add(directionalLight2.position, 'y', -10,10,0.1)
// gui.add(directionalLight2.position, 'z', -10,10,0.1)
// gui.add(directionalLight2.position, 'x', -10,10,0.1)
// gui.add(directionalLight, 'intensity', -10,10,0.1)
// gui.add(directionalLight2, 'intensity', -10,10,0.1)
// gui.hide()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const startAnimation = () => {
    if( camera.position.z > 6 && camera.position.z <= 50){
        camera.position.z -= 0.4

    }

    if(camera.position.z > 50  ){
        camera.position.z -= 0.5

    }
}

//Add click event to each planet link
const planetLink = document.querySelectorAll('.planet-link')
planetLink.forEach(link => {
    link.addEventListener('click', () => {
        gsap.to(camera.position, {duration:3, z:camera.position.z-50})
    })
})






const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

   
    if(earthModel && mercuryModel && venusModel && marsModel && jupiterModel){
        startAnimation()
        earthModel.rotation.y = elapsedTime /3.5
        mercuryModel.rotation.y = elapsedTime /3.5
        venusModel.rotation.y = elapsedTime /3.5
        marsModel.rotation.y = elapsedTime /3.5
        jupiterModel.rotation.y = elapsedTime /3.5

    }
   
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()