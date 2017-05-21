import {setup, animate} from './src/init';
// import {setup} from './src/init2';
import Marine from './src/marine';
const config = {};
const marine = new Marine();
setup(config, marine);
animate(config, marine);
// setup();
