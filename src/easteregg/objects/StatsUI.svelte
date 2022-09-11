<script>
  export let hp;
  export let coins;
  export let level;

  $: hpary = new Array(hp)
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
  <span class="spacer"></span>
  <span>Level: {level}</span>
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