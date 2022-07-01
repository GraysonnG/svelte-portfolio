<script>
  import { fly } from "svelte/transition";
</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <h2>About Me</h2>
  <p>I am a software developer based out of Virginia, USA. My goal is to deliver powerful and modern software solutions.</p>
</section>

<style>
  section {
    position: absolute;
    left: 0;
    top: calc(50% - 12em);
  }
</style>