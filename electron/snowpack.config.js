const path = require('path');
const config = require('./app.config.js');

module.exports = {
  mount: {
    [config.rendererDir]: '/',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-sass',
  ],
  devOptions: {
    output: 'stream', // better for concurrency with electron
    open: 'none', // don't open browser
    port: config.port,
  },
  buildOptions: {
    out: path.join(config.outputDir, 'renderer'),
  },
  packageOptions: {
    // not sure if we need this, as we shouldn't be importing any builtins in the snowpacked/renderer scripts
    // external: [...builtinModules.filter((external) => external !== 'process'), 'electron'],
  },
}