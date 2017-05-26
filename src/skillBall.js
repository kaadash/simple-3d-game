import * as THREE from 'three';

export default class SkillBall {
  applyConfig(config) {
    this.config = config;
  }
  render() {
    this.geometry = new THREE.SphereGeometry( 5, 32, 32 );
    this.material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.sphere = new THREE.Mesh( this.geometry, this.material );
    this.config.scene.add( this.sphere );
  }
  drop() {

  }
}
