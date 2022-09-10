<script>
  import CircleEffect from "./CircleEffect.svelte";
  import icon from "../assets/icon-purple.png";

</script>

<div class="wrapper">
  <!-- <div class="square halftone"></div> -->

  <img src={icon} alt="">

  <CircleEffect
    color="rgba(255,255,255,0.5)"
    size="7em"
    duration="40s"
    />
  <CircleEffect 
    size="5em"
    color="rgba(255,255,255,0.5)"
    quadrants={["top-left", "bottom-right"]}
    reverse
    duration="40s"
    />
  <CircleEffect 
    size="6.7em"
    color="var(--color-highlight)"
    quadrants={["bottom-right"]}
    duration="20s"
    />
  <CircleEffect 
    size="4.7em"
    color="var(--color-highlight)"
    quadrants={["top-right"]}
    duration="20s"
    />
  <CircleEffect 
    size="7.3em"
    color="white"
    quadrants={["top-left"]}
    duration="80s"
    />
  <CircleEffect 
    size="5.3em"
    color="white"
    quadrants={["bottom-left"]}
    duration="80s"
    />
</div>

<style>
  .wrapper {
    position: fixed;
    inset: 0;
    z-index: -1;
  }

  img {
    position: absolute;
    right: 15%;
    bottom: 15%;
    height: 7em;
    transform: translate(50%, 50%);
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
    .wrapper {
      font-size: 0.75em;
    }

    .square {
      height: 8em;
    }
  }
</style>