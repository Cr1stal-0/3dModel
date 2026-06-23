import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const viewer = document.getElementById("viewer");

scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
    75,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    100
);
const renderer = new THREE.WebGLRenderer({
    antialias: true
});


renderer.setSize(
    viewer.clientWidth,
    viewer.clientHeight
);

document.getElementById("viewer")
    .appendChild(renderer.domElement);

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

camera.position.set(0, 1, 5);


const ambientLight = new THREE.AmbientLight(
    0xffffff,
    2
);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    4
);

directionalLight.position.set(
    5,
    10,
    5
);

scene.add(directionalLight);


const params = new URLSearchParams(
    window.location.search
);

const modelFile = params.get("file");

document.getElementById("downloadBtn").href =
    modelFile;



const loader = new GLTFLoader();

let model;

loader.load(
    modelFile,

    function (gltf) {

        model = gltf.scene;


        scene.add(model);

        console.log("Model loaded successfully");
    },

    undefined,

    function (error) {
        console.error(error);
    }
);



function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();