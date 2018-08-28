# react-boilerplate
short, simple, sweet baseline webpack/react configuration

This is just the baseline configuration I use for my own personal projects, hope it's useful to others to use as a starting point.

It's not quite up-to-snuff for production use yet, but it should get you most of the way there.

I'll update it as I refine it over time and add more production-ready capabilities.


## Features:
- Pre-configured babel
  - targets most recent chrome version
  - supports react via babel-preset-react
  - supports stage-0 proposals
  - includes react-hot-loader plugin
- Pre-configured hot-reloadable SCSS/SASS/CSS (using style-loader)
- Properly configured icon font loaders (.eot, .woff, .ttf, .svg)
- Properly configured image loaders (.jpg, .png, .gif)
- Properly configured hot-module reloading
  - including react-hot-loader
- Auto-generated index.html (via webpack-html-plugin)
- Pre-baked react entrypoint
  - includes properly wrapped react-hot-loader

## How to use
- clone this, remove the .git folder
- or: just use the "download zip" option from the github project page
- build your thing
