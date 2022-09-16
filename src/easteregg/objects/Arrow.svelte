<script>
  import { scale } from "svelte/transition";
  import { addEntity } from "../gamestate";

  $: show = false
  $: rotate = -90

  addEntity(state => {
    show = state.enemies.list.length === 0
    const ladder = state.ladder
    const playerPos = state.player.position

    const dx = ladder.x - playerPos.x
    const dy = ladder.y - playerPos.y

    const rads = Math.atan2(dy, dx)
    rotate = rads * 180/Math.PI
    
  })

</script>

{#if show}
  <div 
  transition:scale
  class="outer" style="--rotate: {rotate.toFixed(2)}deg;">
    <i class="arrow fa-solid fa-angle-right"></i>
  </div>
{/if}

<style>
  .outer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: rotate(var(--rotate));
  }

  .arrow {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(2em, -50%);
  }
</style>