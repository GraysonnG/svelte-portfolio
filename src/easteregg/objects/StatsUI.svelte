<script>
  import Fps from "../FPS.svelte";
  import { addEntity } from "../gamestate";

  export let hp;
  export let coins;
  export let level;

  $: hpary = new Array(hp)
  $: maxEnemies = 0
  $: enemies = 0

  addEntity(props => {
    maxEnemies = 10 + (props.gamestate.level * 2)
    enemies = props.enemies.list.length
  })

</script>

<div class="stats">
  <span>
    HP:&nbsp;<div>
      {#each hpary as _}
        <i class="fa-solid fa-heart"></i>
      {/each}

    </div>
  </span>
  <span>Coins: {coins}</span>
  <span>Enemies: {enemies}/{maxEnemies}</span>
  <span class="spacer"></span>
  <span>Level: {level + 1}</span>

  <Fps />
</div>

<style>
  .stats {
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    padding: 0.25rem 1rem;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    pointer-events: none;
  }

  .stats *:not(i) {
    font-family: 'Roboto Mono', 'Courier New', Courier, monospace;
    font-weight: 900;
  }

  .stats .spacer {
    flex-grow: 1;
  }

  span {
    display: flex;
  }

  span div {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    color: var(--color-highlight);
  }

  span div i {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
</style>