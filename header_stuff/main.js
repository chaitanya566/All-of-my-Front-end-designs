import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
let mixer;
let action1;
let action2;
let model;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set the background color to white
const existingElement = document.getElementById("blender_obj");

const camera = new THREE.PerspectiveCamera(38, 2, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(300, 150);
existingElement.appendChild(renderer.domElement);

// Hemisphere light for ambient lighting
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x404040, 7);
scene.add(hemisphereLight);

const loader = new GLTFLoader();

loader.load(
  "./blender_stuff/ALL_DONE3.glb",
  function (gltf) {
    model = gltf.scene; // Assign the loaded model to the model variable
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, "idle_animation_logo");
    action1 = mixer.clipAction(clip);
    const clip1 = THREE.AnimationClip.findByName(clips, "hover_animation_logo");
    action2 = mixer.clipAction(clip1);
    action1.play();
    // Compute the bounding box that encompasses all objects in the scene
    const boundingBox = new THREE.Box3();
    model.traverse((child) => {
      if (child.isMesh) {
        boundingBox.expandByObject(child);
      }
    });

    // Adjust the camera position based on the bounding box
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    // Rotate the camera by 90 degrees around the Y-axis
    camera.position.copy(
      center.clone().add(new THREE.Vector3(0, 3 * boundingBox.max.z, 0))
    );
    camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 1.5);

    // Set the camera's target to the center of the bounding box
    camera.lookAt(center);

    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//setting up teh intercation

const blender_obj = document.getElementById("blender_obj");

blender_obj.addEventListener("mouseenter", function () {
  // Code to execute when the element is being hovered
  action1.loop = THREE.LoopOnce;
  console.log("entered");
  let i = 0;
  mixer.addEventListener("finished", function (e) {
    if (i == 0) {
      console.log("swicthin");
      action1.stop();
      action1.reset();
      action2.play();
      i++;
      action2.loop = THREE.LoopRepeat;
    }
  });
});

blender_obj.addEventListener("mouseleave", function () {
  // Code to execute when the element is not being hovered
  console.log("Element is not being hovered!");
  action2.loop = THREE.LoopOnce;
  console.log("laeved");
  let i = 0;
  mixer.addEventListener("finished", function (e) {
    if (i == 0) {
      console.log("swicthin");
      action2.stop();
      action2.reset();
      action1.play();
      action1.loop = THREE.LoopRepeat;
    }
  });
});

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

//---------------------
// const cursordot = document.querySelector("[data-cursor-dot]")
// const cursoroutline = document.querySelector("[data-cursor-outline]")
// window.addEventListener("mousemove",function(e){
//     const posX = e.clientX;
//     const posY = e.clientY;

//     cursordot.style.left=`${posX}px`
//     cursordot.style.top=`${posY}px`

//     cursoroutline.style.left=`${posX}px`
//     cursoroutline.style.top=`${posY}px`

//     cursoroutline.animate({
//         left:`${posX}px`,
//         top:`${posY}px`
//     },{duration:800,fill:"forwards"});
// })

//---------------------------
const element = document.querySelector(".one-text");
document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll(".dropdown");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Toggle 'active' class

      item.classList.toggle("active");

      // Toggle the display property of the dropdown based on the 'active' class
      const submenu = item.querySelector("ul");
      submenu.style.display = item.classList.contains("active")
        ? "block"
        : "none";

      // Close other open dropdowns
      dropdownItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector("ul").style.display = "none";
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {

  
  var first = document.getElementById("first"); // Get a reference to the element with the id 'first'
  var testElement = document.querySelector(".test");

  // Add the "active" class to the element
  testElement.classList.add("active");
  if (first) {
    var className = " " + first.className + " ";

    first.className = ~className.indexOf(" active ")
      ? className.replace(" active ", " ")
      : first.className + " active";
    // Check if 'active' class is added and add 'show-border' class accordingly
    if (first.classList.contains("active")) {
      element.classList.add("show-border");
    } else {
      element.classList.remove("show-border");
    }
  } else {
    console.error("Element with id 'first' not found.");
  }
  var headerElement = document.querySelector(".header");
  headerElement.classList.add("active");


});


const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
}

animate();
