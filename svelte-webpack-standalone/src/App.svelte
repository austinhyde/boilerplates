<script>
	import Nested from './Nested.svelte';
	// an example of importing some global css - NOT component scoped
	import './global.scss';
	let value = 'world';
</script>

<style type="text/scss">
	p {
		color: blue;
	}
</style>

You are: <input type="text" bind:value>
<p>Hello <Nested name={value}/></p>