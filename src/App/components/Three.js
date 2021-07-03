import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

export default class Three {
	constructor(canvas) {
		this.canvas = canvas;
		this.canvasWidth = canvas.clientWidth;
		this.canvasHeight = canvas.clientHeight;
		window.addEventListener('resize', this.resizeCanvas);
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(70, this.canvasWidth / this.canvasHeight, 0.1, 75);
		this.renderer = new THREE.WebGLRenderer({ canvas });
		this.renderer.setSize(this.canvasWidth, this.canvasHeight, false);
		this.isWebGLAvailable = WEBGL.isWebGLAvailable();
		this.textureLoader = new THREE.TextureLoader();
	}

	resizeCanvas = () => {
		this.canvasWidth = this.canvas.clientWidth;
		this.canvasHeight = this.canvas.clientHeight;
		if(this.canvasWidth !== this.canvas.width || this.canvasheight !== this.canvas.height) {
			this.renderer.setSize(this.canvasWidth, this.canvasHeight, false);
			this.camera.aspect = this.canvasWidth / this.canvasHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.render(this.scene, this.camera);
		}
	}
}