import { DIRECTIONS, W, A, S, D, SHIFT } from "./utils.js";
import * as THREE from "https://cdn.skypack.dev/three@0.128.0/build/three.module.js";
export class CharacterControls {
  jugador;
  mixer;
  animationsMap = new Map(); // Walk, Run, Idle
  orbitControl;
  camera;

  // state
  toggleRun = true;
  currentAction;

  // temporary data
  walkDirection = new THREE.Vector3();
  rotateAngle = new THREE.Vector3(0, 1, 0);
  rotateQuarternion = new THREE.Quaternion();
  cameraTarget = new THREE.Vector3();

  // constants
  fadeDuration = 0.2;
  runVelocity = 10;
  walkVelocity = 2;
  rollVelocity = 12;

  constructor(
    jugador,
    mixer,
    animationsMap,
    orbitControl,
    camera,
    currentAction
  ) {
    this.jugador = jugador;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.currentAction = currentAction;
    this.animationsMap.forEach((value, key) => {
      if (key == currentAction) {
        value.play();
      }
    });
    this.orbitControl = orbitControl;
    this.camera = camera;
    this.updateCameraTarget(0, 0);
  }

  switchRunToggle() {
    this.toggleRun = !this.toggleRun;
  }

  switchAtacar() {
    // console.log("atacar");
    this.atacar = 1;
  }

  switchAtacarStop() {
    // console.log("stop atacar");
    this.atacar = 0;
  }

  switchRoll() {
    // console.log("switchRoll");
    this.roll = 1;
  }

  
  switchRollStop() {
    // console.log("switchRoll");
    this.roll = 0;
  }

  switchJuntar() {
    // console.log("juntar");
    this.juntar = 1;
  }
  switchJuntarStop() {
    // console.log("juntar");
    this.juntar = 0;
  }


  update(delta, keysPressed) {
    const directionPressed = DIRECTIONS.some((key) => keysPressed[key] == true);  

    var play = "";
    if (directionPressed && this.toggleRun) {
      play = "Run";
    } else if (directionPressed) {
      play = "Walk";
    } else {
      play = "Idle_Attacking";
    }
    if (this.juntar == 1) {
      play = "PickUp";
    }
    if (this.atacar == 1) {
      play = "Sword_Attack";
    }
    if (directionPressed && this.roll == 1) {
      play = "Roll";
    }

    if (this.currentAction != play) {
      const toPlay = this.animationsMap.get(play);
      const current = this.animationsMap.get(this.currentAction);

      current.fadeOut(this.fadeDuration);
      toPlay.reset().fadeIn(this.fadeDuration).play();

      this.currentAction = play;
    }

    this.mixer.update(delta);

    if (this.currentAction == "Run" || this.currentAction == "Walk" || this.currentAction == "Roll") {
      // calculate towards camera direction
      var angleYCameraDirection = Math.atan2(
        this.camera.position.x - this.jugador.position.x,
        this.camera.position.z - this.jugador.position.z
      );
      // diagonal movement angle offset
      var directionOffset = this.directionOffset(keysPressed);

      // rotate jugador
      this.rotateQuarternion.setFromAxisAngle(
        this.rotateAngle,
        angleYCameraDirection + directionOffset
      );
      this.jugador.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

      // calculate direction
      this.camera.getWorldDirection(this.walkDirection);
      this.walkDirection.y = 0;
      this.walkDirection.normalize();
      this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

      // run/walk velocity
      var velocity =
        this.currentAction == "Run" ? this.runVelocity : this.walkVelocity;

        if(this.currentAction == "Roll" ) {
          velocity = this.rollVelocity;

        }

      // move jugador & camera
      const moveX = -this.walkDirection.x * velocity * delta;
      const moveZ = -this.walkDirection.z * velocity * delta;
      this.jugador.position.x += moveX;
      this.jugador.position.z += moveZ;
      this.updateCameraTarget(moveX, moveZ);
    }
  }

  updateCameraTarget(moveX, moveZ) {
    // move camera
    this.camera.position.x += moveX;
    this.camera.position.z += moveZ;

    // update camera target
    this.cameraTarget.x = this.jugador.position.x;
    this.cameraTarget.y = this.jugador.position.y + 1;
    this.cameraTarget.z = this.jugador.position.z;
    this.orbitControl.target = this.cameraTarget;
  }

  directionOffset(keysPressed) {
    var directionOffset = 0; // w

    if (keysPressed[S]) {
      if (keysPressed[D]) {
        directionOffset = Math.PI / 4; // w+a
      } else if (keysPressed[A]) {
        directionOffset = -Math.PI / 4; // w+d
      }
    } else if (keysPressed[W]) {
      if (keysPressed[D]) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
      } else if (keysPressed[A]) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
      } else {
        directionOffset = Math.PI; // s
      }
    } else if (keysPressed[D]) {
      directionOffset = Math.PI / 2; // a
    } else if (keysPressed[A]) {
      directionOffset = -Math.PI / 2; // d
    }

    return directionOffset;
  }
}
