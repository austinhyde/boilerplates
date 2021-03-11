<script>
  export let makeCall;
  export let name;
  import { fly } from 'svelte/transition';
  import Header from "./Header.svelte";
  
  $: count = 0;
</script>

<style type="text/scss">
div {
  color: red;
}
</style>

<Header/>
<div>Hello {name}!</div>
<button on:click={() => {makeCall();count++;}} color="primary">click</button>
<p>COOL {count}</p>
{#if count % 2}
  <div transition:fly="{{delay: 250, duration: 300, x:10, y: 10}}">
    fades in and out
  </div>
{/if}