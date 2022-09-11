<script>
  import { onDestroy, onMount } from "svelte";
  import { player, projectiles } from "./gamestate";
  import Projectile from "./objects/Projectile.svelte";
  
  export let tiles = []
  export let tileSize = 0
  
  let unsub;
  let left;
  let top;

  onMount(() => {
    unsub = player.subscribe(p => {
      const x = -1 * (p.position.x) * tileSize
      const y = -1 * (p.position.y) * tileSize

      left = x
      top = y
    })
  })

  onDestroy(() => {
    unsub()
  })

</script>

<div 
  class="map" 
  style="
    left: calc(50% + {left}px); 
    top: calc(50% + {top}px);
    --tile-size: {tileSize}px;
  ">
  {#each tiles as y}
    <div class="row">
      {#each y as x}
        <div class="tile {x == 1 ? "wall" : ""}"></div>
      {/each}
    </div>
  {/each}

  {#each $projectiles as projectile}
    <Projectile projectile={projectile} />
  {/each}
</div>

<style>
  .map {
    position: absolute;
    z-index: -1;
  }

  .row {
    display: flex;
  }

  .tile {
    width: var(--tile-size);
    height: var(--tile-size);
  }

  .wall {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
