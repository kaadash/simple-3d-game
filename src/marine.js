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
    loadedObject.traverse( ( child ) => {
      if ( child instanceof THREE.SkinnedMesh ) {
        this.mesh = child;
      }
    });
    this.idleCount = 0;

    this.mesh.rotation.y = 90 * Math.PI / 180;
    this.config.scene.add( this.mesh );
    this.skeleton = new THREE.SkeletonHelper( this.mesh );
    this.skeleton.visible = false;
    this.config.scene.add( this.skeleton );
    this.mixer = new THREE.AnimationMixer( this.mesh );
    this.idleAction = this.mixer.clipAction( 'idle' );
    this.walkAction = this.mixer.clipAction( 'walk' );
    this.runAction = this.mixer.clipAction( 'run' );
    this.actions = [ this.idleAction, this.walkAction, this.runAction ];
    this.activateAllActions();

    document.addEventListener('keydown', (ev) => {
      this.setWeight( this.idleAction, 0 );
      this.setWeight( this.runAction, 1);

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
      this.setWeight( this.runAction, 0);
    })
  }
  activateAllActions() {
    this.setWeight( this.idleAction, 0 );
    this.setWeight( this.walkAction, 0 );
    this.setWeight( this.runAction, 1);
    this.actions.forEach( function ( action ) {
      action.play();
    } );
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
      console.log(this.idleCount);
      this.idleCount < 40 ? this.idleCount++ : this.idleCount;
      if (this.idleCount > 30) {
        this.mesh.rotation.y = Math.PI;
      }
    }
    this.mixer.update( this.config.clock.getDelta() );
    this.skeleton.update();
  }
}