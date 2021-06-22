import * as THREE from 'three';

export default class Three {
	constructor(canvas) {
		this.canvasWidth = canvas.clientWidth;
		this.canvasHeight = canvas.clientHeight;
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(70, this.canvasWidth / this.canvasHeight, 0.1, 75);
		this.renderer = new THREE.WebGLRenderer({canvas});
		this.renderer.setSize(this.canvasWidth, this.canvasHeight, false);
	}
}