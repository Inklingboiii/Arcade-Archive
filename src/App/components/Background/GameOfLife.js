import * as THREE from 'three';
import Stats from 'three/examples/js/libs/stats.min.js';

export default class GameOfLife {
	constructor(Three, x, y, z) {
		this.three = Three;
		this.size = new THREE.Vector3(x, y, z);
		this.center = this.size.clone().multiplyScalar(0.5)
		this.movementInterval = 1000;
		this.pointsArray = [];
		this.pointsArrayCopy = [];
		this.definePointsArray();
		this.geometry = new THREE.DodecahedronGeometry(0.1, 6);
		this.material = new THREE.MeshBasicMaterial();
		this.circleInstances = new THREE.InstancedMesh(this.geometry, this.material, this.size.x * this.size.y * this.size.z);
		this.circleInstances.matrixAutoUpdate = false;
		this.dummyObject = new THREE.Object3D();
		this.dummyObject.matrixAutoUpdate = false;
		this.stats = new Stats();
	}

	start() {
		this.three.scene.add(this.circleInstances);
		this.three.camera.position.copy(this.center);
		this.spawnRandomPoints();
		this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild( this.stats.dom );
		this.startLoop();
	}

	startLoop() {
		// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
		let currentTime = performance.now();
		let pastTime;
		const render = (renderTime) => {
			this.stats.begin();
			pastTime = renderTime - currentTime;
			if(pastTime > this.movementInterval) {
				this.startNextGeneration();
				// Spanws new points, if there arent any left
				if(this.pointsArray.flat(5).every((cell) => !cell)) {
					this.spawnRandomPoints();
				}
				this.three.renderer.render(this.three.scene, this.three.camera);
			}

			currentTime = renderTime - (pastTime % this.movementInterval);
			requestAnimationFrame(render);
			this.stats.end();
		}		
		requestAnimationFrame(render);
	}

	definePointsArray() {
		for(let x = 0; x < this.size.x; x++) {
			this.pointsArray.push([]);
			for(let y = 0; y < this.size.y; y++) {
				this.pointsArray[x].push([]);
				for(let z = 0; z < this.size.z; z++) {
					this.pointsArray[x][y][z] = false;
				}
			}
		}
	}
	spawnRandomPoints() {
		for(let i = 0; i < 100; i++) {
			const { x, y, z } = this.generateRandomVectorInArea();
			this.pointsArray[x][y][z] = true;
			this.moveInstance(x, y, z);
		}
		this.circleInstances.instanceMatrix.needsUpdate = true;
	}

	generateRandomVectorInArea() {
		return {
			x: Math.floor(Math.random() * this.size.x),
			y: Math.floor(Math.random() * this.size.y), 
			z: Math.floor(Math.random() * this.size.z)
		};
	}

	positionToMeshIndex(x, y, z) {
		return x + (y * this.size.x) + (z * this.size.y * this.size.z);
	}

	moveInstance(x, y, z, index = this.positionToMeshIndex(x, y, z)) {
		this.dummyObject.position.set(x, y, z);
		this.dummyObject.updateMatrix();
		this.circleInstances.setMatrixAt(index, this.dummyObject.matrix);
	}

	startNextGeneration() {
		this.pointsArrayCopy = JSON.parse(JSON.stringify(this.pointsArray));
		for(let x = 0; x < this.size.x; x++) {
			for(let y = 0; y < this.size.y; y++) {
				for(let z = 0; z < this.size.z; z++) {
					const amountOfNeighbors = this.checkAmountOfNeighbors(x, y, z);
					// Check if space is populated
					if(this.pointsArrayCopy[x][y][z]) {
						if(amountOfNeighbors <= 2 || amountOfNeighbors >= 8) {
							// Kill cell by solitude or overpopulation
							this.pointsArray[x][y][z] = false;
							// Remove Cell from scene
							this.moveInstance(999, 999, 999, this.positionToMeshIndex(x, y, z));
						}
					}	else {
							if(amountOfNeighbors === 1) {
								// Revive cell
								this.pointsArray[x][y][z] = true;
								// Add cell to scene
								this.moveInstance(x, y, z);
							}
						}
				}
			}
		}
		this.circleInstances.instanceMatrix.needsUpdate = true;
	}

	checkAmountOfNeighbors(x, y, z) {
		let amountOfNeighbors = 0;
		for(let nx = x - 1; nx < x + 1; nx++) {
			for(let ny = y - 1; ny < y + 1; ny++) {
				for(let nz = z - 1; nz < z + 1; nz++) {
					// Skip if neighbor equals original cell
					if(nx === x && ny === y && nz === z) {
						continue;
					}
					// Skip if neighbor is out of bounds
					if(nx < 0 || nx > this.size.x || ny < 0 || ny > this.size.y || nz < 0 || nz > this.size.z) {
						continue;
					}
					if(this.pointsArrayCopy[nx][ny][nz]) {
						amountOfNeighbors++;
					} 
				}
			}
		}
		return amountOfNeighbors;
	}
}