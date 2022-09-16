<script>
  import { addEntity, startLevel } from "../gamestate";
  import { playerInLadder } from "../helpers/playerhelper";

  $: show = false
  $: left = 0
  $: top = 0

  addEntity((props, dt) => {
    const enabled = props.enemies.list.length === 0

    show = enabled
    left = props.ladder.x * props.map.tileSize
    top = props.ladder.y * props.map.tileSize

    if (enabled && playerInLadder(props.player, props.ladder, props.map.tileSize)) {
      props.gamestate.level += 1
      startLevel()
    }
  })
</script>

{#if show}  
  <div style="
    left: {left.toFixed(3)}px;
    top: {top.toFixed(3)}px;
  " class="ladder">
    <i class="fa-solid fa-stairs"></i>
  </div>
{/if}

<style>
  .ladder {
    display: flex;
    position: absolute;
    font-size: 4em;
    color: white;
    transform: translate(-50%, -50%);
    background-color: rgba(255,255,255,0.2);
    aspect-ratio: 1;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
</style>