<script>
  export let size = "5em";
  export let reverse = false;
  export let quadrants = ["top-right", "bottom-left"];
  export let color = "white"
  export let duration = "20s"

  const direction = reverse ? "alternate-reverse" : "alternate";
</script>

<div 
  class="circle-layer" 
  style="
  --circle-size: {size};
  --animation-duration: {duration}; 
  --animation-direction: {direction}; 
  --color: {color};"
  >
  {#each quadrants as item}
    <div class="quarter-circle {item}"></div>
  {/each}
</div>

<style>
  .circle-layer {
    transform: translate(50%, 50%);
    width: calc(var(--circle-size) * 2);
    aspect-ratio: 1;
  }

  .quarter-circle {
    position: absolute;
    top: 0;
    left: 0;
    --border-size: calc(var(--circle-size) / 40);
    width: var(--circle-size);
    aspect-ratio: 1;
  }

  .quarter-circle.top-right {
    top: 0;
    right: 0;
    --translate: translate(100%, 0%);
    transform: var(--translate);
    transform-origin: bottom left;
    border-radius: 0 var(--circle-size) 0 0;
    border-right: var(--border-size) solid var(--color);
    border-top: var(--border-size) solid var(--color);
    animation: circle-rotate var(--animation-duration) ease-in-out infinite var(--animation-direction);
  }

  .quarter-circle.bottom-left {
    --translate: translate(0%, 100%);
    transform: var(--translate);
    transform-origin: top right;
    border-radius: 0 0 0 var(--circle-size);
    border-bottom: var(--border-size) solid var(--color);
    border-left: var(--border-size) solid var(--color);
    animation: circle-rotate var(--animation-duration) ease-in-out infinite var(--animation-direction);
  }

  .quarter-circle.top-left {
    --translate: translate(0%, 0%);
    transform: var(--translate);
    transform-origin: bottom right;
    border-radius: var(--circle-size) 0 0 0;
    border-left: var(--border-size) solid var(--color);
    border-top: var(--border-size) solid var(--color);
    animation: circle-rotate var(--animation-duration) ease-in-out infinite var(--animation-direction);
  }

  .quarter-circle.bottom-right {
    --translate: translate(100%, 100%);
    transform: var(--translate);
    transform-origin: top left;
    border-radius: 0 0 var(--circle-size) 0;
    border-bottom: var(--border-size) solid var(--color);
    border-right: var(--border-size) solid var(--color);
    animation: circle-rotate var(--animation-duration) ease-in-out infinite var(--animation-direction);
  }

  @keyframes circle-rotate {
    from {
      transform: var(--translate) rotate(0deg);
    }

    to {
      transform: var(--translate) rotate(-360deg);
    }
  }
</style>