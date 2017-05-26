import * as THREE from 'three';

const left = 37,
  up = 38,
  right = 39,
  down = 40;

export default class Marine {
  applyConfig(config) {
    this.config = config;
  }
  handleLoad(loadedObject) {
  const material = new THREE.MeshLambertMaterial( {
    color: 0x3ad63a,
      morphTargets: true,
      vertexColors: THREE.FaceColors,
      shading: THREE.SmoothShading
  } );

  this.mesh = new THREE.Mesh( loadedObject, material );
    this.idleCount = 0;

    this.mesh.rotation.y = 90 * Math.PI / 180;
    this.config.scene.add( this.mesh );
    this.skeleton = new THREE.SkeletonHelper( this.mesh );
    console.log(this.skeleton);
    this.skeleton.visible = false;
    this.config.scene.add( this.skeleton );
    this.mixer = new THREE.AnimationMixer( this.mesh );
    this.idleAction = this.mixer.clipAction( 'animation_' );
    this.actions = [ this.idleAction ];
    this.activateAllActions();

    document.addEventListener('keydown', (ev) => {
      this.setWeight( this.idleAction, 1 );
      // this.setWeight( this.runAction, 1);

      switch (ev.keyCode) {
        case right:
          if (!this.isRunning) {
            if (this.mesh.rotation.y === Math.PI) {
              this.mesh.rotation.y = -90 * Math.PI / 180;
            } else if (this.mesh.rotation.y > 0) {
              this.mesh.rotation.y = -this.mesh.rotation.y;
            }
          }
          // this.mesh.translateZ(-2);
          break;

        case left:
          if (!this.isRunning) {
            if (this.mesh.rotation.y === Math.PI) {
              this.mesh.rotation.y = 90 * Math.PI / 180;
            } else if (this.mesh.rotation.y < 0){
              this.mesh.rotation.y = -this.mesh.rotation.y;
            }
          }
          break;
      }
      this.isRunning = true;
    });
    document.addEventListener('keyup', (ev) => {
      this.isRunning = false;
      this.setWeight( this.idleAction, 1 );
    })
  }
  activateAllActions() {
    this.setWeight( this.idleAction, 1 );
    this.idleAction.play();
  }

  setWeight( action, weight ) {
    action.enabled = true;
    action.setEffectiveTimeScale( 1 );
    action.setEffectiveWeight( weight );
  }

  animate() {
    if (this.isRunning) {
      this.idleCount = 0;
      this.mesh.translateZ(-4);
    } else {
      this.idleCount < 40 ? this.idleCount++ : this.idleCount;
      if (this.idleCount > 30) {
        this.mesh.rotation.y = Math.PI;
      }
    }
    this.mixer.update( this.config.clock.getDelta() );
    this.skeleton.update();
  }
}