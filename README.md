# react-boilerplate
short, simple, sweet baseline webpack/react configuration

This is just the baseline configuration I use for my own personal projects, hope it's useful to others to use as a starting point.

It's not quite up-to-snuff for production use yet, but it should get you most of the way there.

I'll update it as I refine it over time and add more production-ready capabilities and boilerplate archetypes (e.g. electron, native, component).


## Features
- Pre-configured webpack/webpack-dev-server
- Pre-configured babel
  - targets most recent chrome version via babel-preset-env
  - supports react via babel-preset-react
  - supports async/await and other accepted ECMAScript proposals
  - includes react-hot-loader plugin
- Pre-configured hot-reloadable SCSS/SASS/CSS
  - uses style-loader in development for in-page `<style>`
  - uses mini-css-extract-loader in prod for external stylesheets
- Properly configured icon font loaders (.eot, .woff, .ttf, .svg)
- Properly configured image loaders (.jpg, .png, .gif)
- Properly configured hot-module reloading
  - including react-hot-loader
- Auto-generated index.html (via webpack-html-plugin)
  - always outputs to disk for compatibility with being served from external server
- Pre-baked react entrypoint
  - includes properly wrapped react-hot-loader

## How to use
- clone or download this, copy the contents of the `webapp` folder to your project
- `npm install`
- build your thing
- probably tweak package.json to your liking
- `npm start` will start a dev server with hot reloading
- `npm run build` will build a static bundle of your code

## Roadmap
- Verify minification, external serving
- electron boilerplate
- component/library boilerplate
- native/app boilerplate