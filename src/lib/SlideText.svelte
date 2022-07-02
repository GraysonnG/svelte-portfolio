<script>
  export let text = ""
  export let size = "1em"
  export let duration = 500
  export let delay = 0
  export let fromBottom = false
  export let animate = true
  export let caps = false

  const words = text.split(" ")
  const randomDelay = () => (duration + (Math.random() * duration) + delay).toFixed(0)
</script>


<div class="text" class:from-bottom={fromBottom} style="font-size: {size};">
  {#if animate}
    {#each words as word}
      <span class="word" style="
        {caps ? "text-transform: uppercase;" : ""}
        --transition-delay: {randomDelay()}ms;
        --transition-duration: {duration}ms;"
      >{@html word}&nbsp;</span>
    {/each}
  {/if}
</div>


<style>
  .text {
    overflow: hidden;
    position: relative;
    display: inline-block;
    min-height: 1.5em;
  }

  .word {
    display: inline-block;
    animation-name: flyInTop;
    animation-duration: var(--transition-duration);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-delay: var(--transition-delay);
    position: relative;
    transition: all 100ms;
    transform: translateY(0);
  }

  .text.from-bottom .word{
    animation-name: flyInBottom;
  }

  @keyframes flyInTop {
    0% {
      transform: translateY(0) skewY(0deg);
      opacity: 1;
    }

    50% {
      transform: translateY(100%) skewY(15deg);
      opacity: 0;
    }

    51% {
      transform: translateY(-100%) skewY(-15deg);
    }

    100% {
      transform: translateY(0) skewY(0deg);
      opacity: 1;
    }
  }

  @keyframes flyInBottom {
    0% {
      transform: translateY(0) skewY(0deg);
      opacity: 1;
    }

    50% {
      transform: translateY(-100%) skewY(-15deg);
      opacity: 0;
    }

    51% {
      transform: translateY(100%) skewY(15deg);
    }

    100% {
      transform: translateY(0) skewY(0deg);
      opacity: 1;
    }
  }
</style>