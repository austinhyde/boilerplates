# Austin's Boilerplates

This repo contains some boilerplate I use for various projects.

Details on the different boilerplates are below, but generally, you can just download/clone this repo, then copy the relevant subfolder to a new directory.

Keeping all of this in a single repo just makes it easier for me to coordinate changes, especially for "combination" projects, like react+webpack frontend + go backend. Maybe some day I'll get around to turning this into a set of yeoman or cookiecutter or something templates, but for now this is good enough. I like simple.

## Boilerplate: react

Short, simple, sweet baseline webpack/react configuration

This is just the baseline configuration I use for my own personal projects, hope it's useful to others to use as a starting point.

It's not quite up-to-snuff for production use yet, but it should get you most of the way there.

I'll update it as I refine it over time and add more production-ready capabilities and boilerplate archetypes (e.g. electron, native, component).

Features:
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

How to use:
- clone or download this, copy the contents of the `react` folder to your project
- `npm install`
- build your thing
- probably tweak package.json to your liking
- `npm start` will start a dev server with hot reloading
- `npm run build` will build a static bundle of your code

## Boilerplate: svelte

Sets up a frontend-only [svelte](https://svelte.dev) project based on webpack with some useful defaults out of the box:
- [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess)
- sass/scss: use `<style type="text/scss">...</style>`
- [Hot Module Reloading](https://github.com/rixo/svelte-hmr)
- Global CSS imports work just like in react world: `import './global.scss'` and are hot-reloaded
- `global.scss` contains the standard svelte template styles

How to use:
- Copy the contents of the `svelte` folder to your project
- `npm install`
- `npm start` to start a dev server with hot reloading
- `npm run build` to build a static bundle into the `dist` folder

Differences to standard svelte projects:
- Some patterns inherited from the `react` boilerplate:
  - Generates an `index.html` on its own, instead of using a handmade one. Because we live in the future. Maybe I'll consider changing both of these at some point.
  - Outputs to `./dist` instead of `./public/build`
- `global.scss` is imported from `App.svelte` instead of `index.html`
- Uses webpack instead of rollup. Maybe some day I'll make some rollup boilerplates, but webpack is what I'm familiar with. Plus, it would seem that HMR with rollup is a controversial subject, and HMR is the best thing since jquery. HMR seems to just work as expected out of the box with webpack. The downside is that 

## Boilerplate: run-script-docker

This contains a script I call a "run script" - it's not a framework as much as it is a self-aware bash script that lets you define project automation commands with plain old bash (as opposed to, say, make). It also comes with some utilities for elevating commands into a development docker container.

More details here: https://gist.github.com/austinhyde/2e39c01d6b0ebf4aef7409e129c47ea7

This is a slightly meatier version than the stripped down one in the gist:
- Moved common functionality to `run-common.sh`
- Added `_run-info` and `_run-cmd` helper functions to pretty-print information and commands
- Collected the main help/execution code into `_run-main` function
- Moved docker functionality to `run-docker.sh`
- Renamed `run-in-docker` to `_run-in-docker` to align with the namespacing convention
- Added automatically-run `_run-build-dev-docker` to build a custom docker image
- Added some examples of dev docker images + args
- Scan any `source`'d files with a `#follow` comment

## Boilerplate: go-api

Implements a fairly vanilla API server in Go.

Out of the box, it consists of:
- `cmd/server` main package, run like `go run ./cmd/server -v -d localhost:8080`
- `types` package declares the core types and interfaces for the service
- `service` implements the service
- `jsonapi` package, implements a JSON-RPC (or REST) server around the service with a number of helpers and json types

TODO:
- Provide `GraphQL` and `GRPC` alternatives as well
- Provide database layer boilerplate
- Docker image
- Auto-reload for dev

## Boilerplate: electron

Simple boilerplate for an electron app, with allowances for various front-end framework boilerplates.

At the moment it comes configured for Svelte.

Supports
- Building executables with `electron-builder`
- Webpack configuration in both renderer and main with `electron-webpack`
- Hot module reloading via `webpack`
  - TODO: svelte component state is getting wiped on a hot reload??

As opposed to the other JS boilerplates, it's recommended to use `yarn` instead of `npm`.

- To install: `yarn`
- To start developing: `yarn start`
- To build: `yarn build`
- To package: `yarn dist`


## TODO
- react component/library boilerplate
- native/app boilerplate