import * as THREE from 'three'

export default class GameOfLife {
	constructor(Three, x, y, z) {
		this.three = Three;
		this.size = new THREE.Vector3(x, y, z);
		this.center = this.size.clone().multiplyScalar(0.5);
		this.minX = Math.round(this.center.x / 2);
		this.maxX = Math.round(this.center.x * 1.5);
		this.minY = Math.round(this.center.y / 2);
		this.maxY = Math.round(this.center.y * 1.5);
		this.minZ = Math.round(this.center.z / 2);
		this.maxZ = Math.round(this.center.z * 1.5);
		this.movementInterval = 3000;

		this.pointsArray = [];
		this.pointsArrayCopy = [];
		this.definePointsArray();

		this.three.scene.background = new THREE.Color('#111');

		this.geometry = new THREE.DodecahedronGeometry(0.1, 6);
		this.material = new THREE.MeshPhongMaterial();
		this.circleInstances = new THREE.InstancedMesh(this.geometry, this.material, this.size.x * this.size.y * this.size.z);
		this.circleInstances.matrixAutoUpdate = false;
		this.light = new THREE.PointLight();
		this.light.position.copy(this.center);
		this.dummyObject = new THREE.Object3D();
		this.dummyObject.matrixAutoUpdate = false;
	}

	start() {
		this.three.scene.add(this.light)
		this.three.scene.add(this.circleInstances);
		this.three.camera.position.copy(this.center);
		this.spawnRandomPoints();
		this.spawnCube();
		// So it appears immediatly and not after next render iteration
		this.three.renderer.render(this.three.scene, this.three.camera);
		this.startLoop();
	}

	startLoop() {
		// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
		let currentTime = performance.now();
		let pastTime;
		const render = (renderTime) => {
			pastTime = renderTime - currentTime;
			if(pastTime > this.movementInterval) {
				this.startNextGeneration();
				// Spanws new points, if there arent any left
				if(this.pointsArray.flat(5).every((cell) => !cell)) {
					this.spawnRandomPoints();
					this.spawnCube
				}
				this.three.renderer.render(this.three.scene, this.three.camera);
			}

			currentTime = renderTime - (pastTime % this.movementInterval);
			requestAnimationFrame(render);
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

	spawnCube() {
		// First both sides on the z axis
		for(let z = this.minZ; z < this.maxZ; z++) {
			for(let y = this.minY; y < this.maxY; y++) {
				for(let x = this.minX; x < this.maxX; x++) {
					this.pointsArray[x][y][z] = true;
					this.moveInstance(x, y, z);
				}
			}
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
		// add random off set to make it look more chaotic
		this.dummyObject.position.set(x, y, z);
		this.dummyObject.rotation.set(Math.random(), Math.random(), Math.random())
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
		for(let nx = x - 1; nx <= x + 1; nx++) {
			for(let ny = y - 1; ny <= y + 1; ny++) {
				for(let nz = z - 1; nz <= z + 1; nz++) {
					// Skip if neighbor equals original cell
					if(nx === x && ny === y && nz === z) {
						continue;
					}
					// Skip if neighbor is out of bounds
					if(nx < 0 || nx >= this.size.x || ny < 0 || ny >= this.size.y || nz < 0 || nz >= this.size.z) {
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