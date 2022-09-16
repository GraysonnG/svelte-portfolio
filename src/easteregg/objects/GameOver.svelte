<script>
  import { addEntity } from "../gamestate";
  import { fade, fly } from "svelte/transition";

  $: show = false

  addEntity(({ gamestate, player: { hp } }) => {
    show = hp <= 0

    if (show) {
      setTimeout(() => {
        gamestate.paused = true
      }, 100)
    }
  }) 
</script>


{#if show}
<div transition:fade>
  <span transition:fly={{ y: -500 }}>Game Over!</span>
</div>
{/if}

<style>
  div {
    display: grid;
    position: absolute;
    inset: 0;
    background-color: rgb(255, 0, 0, 0.1);
    place-items: center;
    backdrop-filter: blur(5px);
  }

  span {
    font-weight: 400;
    font-family: 'Roboto Mono', 'Courier New', Courier, monospace;
    font-size: 6rem;
    text-shadow: 0 5px 10px rgb(0, 0, 0, 1);
  }
</style>