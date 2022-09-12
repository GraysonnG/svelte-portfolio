<script>
  import { addEntity } from "../gamestate";

  $: tiles = []
  $: height = 100 / tiles.length
  $: plrLeft = 0
  $: plrTop = 0
  $: ldrLeft = 0
  $: ldrTop = 0
  $: ldrShow = false

  addEntity(state => {
    tiles = state.map.tiles
    const h = 100 / tiles.length

    plrTop = state.player.position.y * h
    plrLeft = state.player.position.x * h

    ldrTop = state.ladder.y * h
    ldrLeft = state.ladder.x * h
    ldrShow = state.enemies.list.length === 0
    
  })

  

</script>

<div class="minimap" style="--tile-height: {height.toFixed(2)}%;">
  {#each tiles as y}
    <div class="row">
      {#each y as x}
        <div class="tile" class:wall={ x === 1 }></div>
      {/each}
    </div>
  {/each}

  <div class="player" style="
    left: {plrLeft}%;
    top: {plrTop}%;
  "></div>

  {#if ldrShow}
    <div class="ladder" style="
      left: {ldrLeft}%;
      top: {ldrTop}%;
    "></div>
  {/if}
</div>

<style>
  .minimap {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    width: 10%;
    aspect-ratio: 1;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    box-shadow: 0 3px 10px black;
    transition: all 300ms;
  }

  .minimap:hover {
    width: 15%;
  }

  .row {
    display: flex;
  }

  .tile {
    width: var(--tile-height);
    height: var(--tile-height);
    aspect-ratio: 1;
  }

  .wall {
    background-color: rgba(255, 255, 255, 0.15) !important;
  }

  .player {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: lime;
    transform: translate(-50%, -50%);
  }

  .ladder {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: cyan;
    transform: translate(-50%, -50%);
  }
</style>