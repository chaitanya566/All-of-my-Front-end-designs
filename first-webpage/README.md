# first-webpage
This project showcases a captivating 3D model created using Blender, adding a dynamic touch to the user experience. The primary focus is on animating the 3D model, creating distinctive animations based on user interaction.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [```Node.js```](https://nodejs.org/) (v14 or later recommended)
- [```npm ```](https://www.npmjs.com/) (comes with Node.js)
- [```Blender ```](https://www.blender.org/) (for working with 3D models (optional if you want to edit the glb file))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chaitanya566/Front-end-design.git
    ```

2. Navigate to the project directory:

3. Install dependencies using ```npm```:
    ```bash
        npm install --save-dev
    ```
    (has pre-installed vite if u dont want to install vite just remove the ```--save dev```)

### Running the Project

- To start the development server, run:

    npx vite
    
### Project Structure
- The project is structured to efficiently handle the integration of a pre-made 3D model, its animations, and user interactions. Below is an overview of the key components and their roles in the code:
1. **Imported Libraries:**
    ```
        import * as THREE from 'three';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    ```
- Importing the core THREE.js library for 3D graphics.
- Loading GLTF ```(Graphics Library Transmission Format)``` models.
- Adding orbit controls for interaction.
2. **Global Variables:**
    ```
    let mixer;
    let action1;
    let action2;
    let model;
    ```
- Variable to hold the ```THREE.AnimationMixer``` for managing animations.
- Variables for animation actions (idle and hover).
- Variable to store the loaded 3D model.
3. **Scene Setup:**

- Creating a ```THREE.js``` scene, setting the background color, and initializing a container element for rendering.
4. **Camera Setup:**
- Configuring a ```perspective camera``` with parameters for field of view, aspect ratio, and near/far clipping planes.

5. **Renderer Setup:**
- Initializing a WebGL renderer with antialiasing and appending it to the container element.

6. **Lighting:** 
- Adding a hemisphere light to provide ambient lighting in the scene. 

7. **Loading 3D Model:** 
- Utilizing the GLTFLoader to load a pre-made 3D model in ```GLTF format (.glb)```.
- Setting up animations using THREE.AnimationMixer and configuring the camera based on the model's bounding box.

8. **Interaction Setup:** 
- Adding event listeners for mouseenter and mouseleave on an existing HTML element of id ```canvas_scene```.
- Configuring animations to play, stop, and switch based on user interaction.

9. **Cursor-related Effects:** 
- Implementing cursor-related effects with a dot and an outline that follow the mouse cursor's position.

10. **Animating the Scene:**
- Implementing a function (animate()) to continuously update the scene, including controls and animations, using the
```requestAnimationFrame```  loop.
