<script>
  import CircleEffect from "./CircleEffect.svelte";


</script>

<div class="wrapper">
  <div class="square halftone"></div>

  <CircleEffect
    color="rgba(255,255,255,0.3)"
    size="7em" 
    />
  <CircleEffect 
    size="5em"
    color="rgba(255,255,255,0.5)"
    quadrants={["top-left", "bottom-right"]}
    reverse
    />
</div>

<style>
  .wrapper {
    position: fixed;
    inset: 0;
    z-index: -1;
  }

  .square {
    position: absolute;
    right: 15%;
    bottom: 15%;
    height: 12em;
    --translate: translate(50%, 50%);
    aspect-ratio: 1;
    transform: var(--translate);
    transform-origin: center center;
    animation: rotate 10s ease-in-out infinite alternate;
  }

  .halftone::before {
    content: "";
    background-color: transparent;
    background-image: radial-gradient(rgba(255, 255, 255, 1) 14%, transparent 17%);
    background-size: 30% 30%;
    background-repeat: space;
    position: absolute;
    min-height: 100%;
    min-width: 100%;
    z-index: -1;
  }

  .wrapper :global(.circle-layer) {
    position: absolute;
    right: 15%;
    bottom: 15%;
  }

  @keyframes rotate {
    from {
      transform: var(--translate) rotate(35deg) scale(0.5);
    }

    to {
      transform: var(--translate) rotate(195deg) scale(0.25);
    }
  }

  @media screen and (max-width: 600px) {
    .square {
      height: 8em;
    }
  }
</style>