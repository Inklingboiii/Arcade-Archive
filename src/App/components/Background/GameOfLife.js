import * as THREE from 'three';

export default class GameOfLife {
	constructor(Three, x, y, z) {
		this.three = Three;
		this.size = new THREE.Vector3(x, y, z);
		this.center = this.size.clone().multiplyScalar(0.5)
		this.movementInterval = 1000;
		this.pointsArray = [];
		this.pointsArrayCopy = [];
		this.definePointsArray();
		this.geometry = new THREE.DodecahedronGeometry(0.5, 6);
		this.material = new THREE.MeshBasicMaterial();
		this.circleInstances = new THREE.InstancedMesh(this.geometry, this.material, this.size.x * this.size.y * this.size.z);
		this.dummyObject = new THREE.Object3D();
		this.dummyObject.matrixAutoUpdate = false;
	}

	start() {
		this.three.scene.add(this.circleInstances);
		this.three.camera.position.copy(this.center);
		this.three.camera.position.z = this.size.z * 2;
		this.three.camera.lookAt(this.center)
		this.spawnRandomPoints();
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
				this.three.renderer.render(this.three.scene, this.three.camera);
			}

			currentTime = renderTime - (pastTime % this.movementInterval);
			requestAnimationFrame(render)
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
		for(let i = 0; i < 200; i++) {
			const position = this.generateRandomVectorInArea();
			this.dummyObject.position.copy(position);
			this.dummyObject.updateMatrix();
			this.circleInstances.setMatrixAt(this.positionToMeshIndex(this.dummyObject.position), this.dummyObject.matrix);
			this.pointsArray[position.x][position.y][position.z] = true;
		}
		this.circleInstances.instanceMatrix.needsUpdate = true;
	}

	generateRandomVectorInArea() {
		return new THREE.Vector3(Math.floor(Math.random() * this.size.x), Math.floor(Math.random() * this.size.y), Math.floor(Math.random() * this.size.z));
	}

	positionToMeshIndex(x, y, z) {
		// https://math.stackexchange.com/questions/1176184/how-to-find-unique-numbers-from-3-numbers
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
						if(amountOfNeighbors <= 2 || amountOfNeighbors >= 20) {
							// Kill cell by solitude or overpopulation
							this.pointsArray[x][y][z] = false;
							// Remove Cell from scene
							this.moveInstance(999, 999, 999, this.positionToMeshIndex(x, y, z));
						} else {
							if(amountOfNeighbors >= 3 || amountOfNeighbors <= 19) {
								// Revive cell
								this.pointsArray[x][y][z] = true;
								// Add cell to scene
								this.moveInstance(x, y, z);
							}
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