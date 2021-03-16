<script>
	import _ from 'lodash'; // make sure loading npm packages works
	import Greeting from './Greeting.svelte'; // make sure local imports work
	import './global.scss'; // make sure sass imports work

	let name = 'world';
  $: window.ipcRenderer.send('name-updated', name); // note ipcRenderer from src/main/preload.js

  let greeting = '';
  window.ipcRenderer.on('greet', (_, s) => greeting = s);
</script>

<style type="text/scss">
	p {
		color: blue; // change this to test hot module reloading
	}
</style>

{_.times(5).join(',')}
You are: <input type="text" bind:value={name}>
<p><Greeting {greeting}/></p>