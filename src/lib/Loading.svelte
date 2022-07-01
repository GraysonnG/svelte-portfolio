<script>
import { onMount } from "svelte";

  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
  import { state } from "../stores/main";

  let loadingPercent = 0;
  let max = 90;
  let animation;
  let done = false

  const animate = () => {
    if (!get(state).loading) max = 103
    if (loadingPercent < max) loadingPercent += 3;

    if (loadingPercent < 103) {
      animation = requestAnimationFrame(() => {
        animate()
      })
    } else {
      loadingPercent = 100
      setTimeout(() => {
        done = true
      });
      animation = cancelAnimationFrame(animation)
    }
  }

  onMount(() => {
    animation = requestAnimationFrame(() => {
      animate();
    })
  })
</script>

{#if !done}
  <div class="background" transition:fade={{duration: 1000}}>
    <div style="--loading-percent: {loadingPercent}%;" class="loading-bar">
      <span>{loadingPercent}%</span>
    </div>
  </div>
{/if}

<style>
  .background {
    position: fixed;
    inset: 0;
    transform: translateX(0%);
  }

  .loading-bar {
    position: absolute;
    height: 0.25rem;
    width: var(--loading-percent);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-highlight);
  }

  .loading-bar span {
    position: absolute;
    top: calc(100% + 0.5em);
    left: 50%;
    transform: translateX(-50%);
  }
</style>