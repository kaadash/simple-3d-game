import * as THREE from 'three';

export const loadObject = (url, callback) => {
  new THREE.JSONLoader().load( url, callback);
};

export const setup = (config, objectToPassConfig, callback) => {
  const marineObjUrl = './src/8_3_2.json';
  config.scene = new THREE.Scene();
  config.clock = new THREE.Clock();
  config.container = document.getElementById('container');
  var light = new THREE.AmbientLight( 0x404040, 2 );
  light.position.set( 1, 1, 1 ).normalize();
  config.scene.add( light );

  var light = new THREE.DirectionalLight( 0xffefef, 1 );
  light.position.set( -1, -1, -1 ).normalize();
  config.scene.add( light );

  config.scene.add(config.light);
  config.renderer = new THREE.WebGLRenderer( { antialias: true } );
  config.renderer.setClearColor( 0x000000 );
  config.renderer.setPixelRatio( window.devicePixelRatio );
  config.renderer.setSize( window.innerWidth, window.innerHeight );
  config.container.appendChild( config.renderer.domElement );
  const aspect = window.innerWidth / window.innerHeight;
  config.camera = new THREE.PerspectiveCamera( 45, aspect, 1, 10000 );
  config.camera.position.set( 0.0, 120, 700 );
  objectToPassConfig.applyConfig(config);
  loadObject(marineObjUrl, objectToPassConfig.handleLoad.bind(objectToPassConfig));
};

export const animate = (config, marine) => {
  // Render loop
  const loop = () => {
    requestAnimationFrame( loop );
    marine.animate();
    config.renderer.render( config.scene, config.camera );
  };
  loop();
};