<script>
  import {ipcRenderer} from 'electron';
	import Greeting from './Greeting.svelte';

	// an example of importing some global css - NOT component scoped
	import './global.scss';

	let name = 'world';
  $: ipcRenderer.send('name-updated', name)

  let greeting = '';
  ipcRenderer.on('greet', (_, s) => greeting = s);
</script>

<style type="text/scss">
	p {
		color: red;
	}
</style>

You are: <input type="text" bind:value={name}>
<p><Greeting {greeting}/></p>