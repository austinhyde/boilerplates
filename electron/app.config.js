module.exports = {
  rendererDir: 'src/renderer-svelte',
  outputDir: 'dist',
  isDev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.SNOWPACK_PORT) || 61302, // just a random number
};