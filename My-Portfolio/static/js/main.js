import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let mixer;
let action1;
let action2;
let action3;
let model;
const loader = new GLTFLoader();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const existingElement = document.getElementById("Canvas-Renderer-Div");

//CAMERA -----------------
const camera = new THREE.PerspectiveCamera(45,700 / existingElement.clientHeight,0.1,1000);
camera.position.set(5, 10, 0);
camera.lookAt(new THREE.Vector3(5, 0, 0));
// Zoom in on the object
camera.fov = 45;
camera.updateProjectionMatrix(); // Update the camera's projection matrix

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(700, existingElement.clientHeight);
existingElement.appendChild(renderer.domElement);
//CAMERA -----------------

// Add a directional light for casting shadows
const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(10, 20, 0);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 200;
dirLight.shadow.camera.bottom = -200;
dirLight.shadow.camera.left = -200;
dirLight.shadow.camera.right = 200;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 500;
scene.add(dirLight);

// Hemisphere light for ambient lighting
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x404040, 9);
scene.add(hemisphereLight);

loader.load(
  "./blender/CS_animation3.glb",
  function (gltf) {
    model = gltf.scene; // Assign the loaded model to the model variable
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;

    const clip1 = THREE.AnimationClip.findByName(clips, "Cylinder1.Action");
    const clip2 = THREE.AnimationClip.findByName(clips, "Cylinder2.Action");
    const clip3 = THREE.AnimationClip.findByName(clips, "Cylinder3.Action");

    if (clip1 && clip2 && clip3) {
      action1 = mixer.clipAction(clip1);
      action2 = mixer.clipAction(clip2);
      action3 = mixer.clipAction(clip3);

      action1.play();
      action2.play();
      action3.play();

      action1.loop = THREE.LoopRepeat;
      action2.loop = THREE.LoopRepeat;
      action3.loop = THREE.LoopRepeat;
    } else {
      console.error("One or more animation clips not found.");
    }

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Enable shadow casting
        child.receiveShadow = true;
      }
    });

    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const element = document.querySelector(".one-text");
document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll(".dropdown");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {});
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var first = document.getElementById("Secondary-Main-Div");
  var testElement = document.querySelector(".Background-for-header");

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

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  function openModal(src) {
    modal.style.display = "block";
    modalImg.src = src;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  // Add event listeners to all images
  const images = document.querySelectorAll(".box-image img");
  images.forEach((img) => {
    img.addEventListener("click", function () {
      openModal(this.src);
    });
  });

  // Close the modal when the close button is clicked
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closeModal);

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });
});

function moveBoxes(containerId) {
  const container = document.getElementById(containerId);
  const boxes = container.querySelectorAll(".box-image");

  let currentBox = 0;
  let intervalId;

  function transitionNextBox() {
    const nextBox = (currentBox + 1) % boxes.length;
    boxes[currentBox].style.transform = `translateX(-100%)`;
    boxes[nextBox].style.transform = `translateX(0)`;
    currentBox = nextBox;
    if (currentBox === 0) {
      setTimeout(() => {
        for (let i = 0; i < boxes.length; i++) {
          boxes[i].style.transform = `translateX(${i * 100}%)`;
        }
      }, 2500);
    }
  }

  function startTransition() {
    intervalId = setInterval(transitionNextBox, 5000);
  }

  startTransition();
}

moveBoxes("container1");
moveBoxes("container2");
moveBoxes("container3");

//-------------animating it using frames with
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
}

animate();
