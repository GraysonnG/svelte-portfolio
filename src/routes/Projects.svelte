<script>
  import { fly } from "svelte/transition";
</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <h2>My Projects</h2>
</section>