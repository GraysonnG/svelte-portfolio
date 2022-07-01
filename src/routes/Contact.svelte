<script>
import { fly } from "svelte/transition";


  fly
</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <h2>Reach Out!</h2>
</section>

<style>
  section {
    position: absolute;
    left: 0;
    top: calc(50% - 12em);
  }
</style>