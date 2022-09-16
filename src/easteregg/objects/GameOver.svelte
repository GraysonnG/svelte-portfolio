<script>
  import { addEntity, newGame } from "../gamestate";
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
<div class="wrapper" transition:fade>
  <div>
    <span transition:fly={{ y: -500 }}>Game Over!</span>
    <button on:click={() => {
      show = false
      newGame()
    }}>Restart</button>
  </div>
</div>
{/if}

<style>
  .wrapper {
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

  .wrapper div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    background-color: var(--color-highlight);
    border: none;
    padding: 0.25rem 1rem;
    border-radius: 4px;
    color: white;
    box-shadow: 0 2px 3px black;
    text-shadow: 0 2px 3px black;
  }
</style>