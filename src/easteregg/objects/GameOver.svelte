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
    background-color: rgb(200,200,200);
    border: none;
    padding: 0.125em 1em;
    border-radius: 4px;
    color: rgb(0, 0, 0, 0.7);
    font-weight: 400;
    font-size: 2rem;
    box-shadow: 0 2px 3px black;
    transition: transform 250ms;
  }

  button:hover {
    background-color: rgb(100,255,150);
    transform: scale(1.1);
  }
</style>