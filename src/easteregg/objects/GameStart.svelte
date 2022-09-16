<script>
  import { gamestate } from "../gamestate";

  

  const onClickHandler = () => {
    gamestate.update(state => {
      state.paused = false
      state.starting = false
      return state
    })

    
  }
</script>

{#if $gamestate.starting}
<div class="wrapper">
  <div class="content">
    <div class="section">
      <span>Movement:</span>
      <div class="controls">
        <span style="grid-area: shift;">Shift</span>
        <span style="grid-area: w;">W</span><br>
        <span style="grid-area: a;">A</span>
        <span style="grid-area: s;">S</span>
        <span style="grid-area: d;">D</span>
      </div>
    </div>
    <div class="section">
      <span>Attack:</span>
      <span class="outline" style="width: 100%; text-align: center; display:block;">Left Click</span>
    </div>
    <button on:click={onClickHandler}>Start!</button>
  </div>
</div>
{/if}

<style>
  .wrapper {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    display: grid;
    place-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    padding: 2rem;
  }

  .controls {
    display: grid;
    grid-template-columns: 4rem 2rem 2rem 2rem 2rem;
    grid-template-areas: 
    ". .     . w ."
    "shift . a s d";
    place-items: center;
    gap: 0.25em;
  }

  .controls span {
    width: 100%;
    height: 2rem;
    text-align: center;
    border: 1px solid white;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .outline {
    height: 2rem;
    border: 1px solid white;
    border-radius: 4px;
  }

  .section {
    width: 100%;
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