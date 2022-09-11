<script>
  import CircleEffect from "./CircleEffect.svelte";
  import icon from "../assets/icon-purple.png";
  import { create_in_transition } from "svelte/internal";
  import { exitGameEasterEgg, goToGameEasterEgg, state } from "../stores/main";
  import { flip } from "../transitions/flip";
  import { get } from "svelte/store";

  let easteregg;
  let element;

  const animate = () => {
    if (!easteregg) {
      easteregg = create_in_transition(element, flip, {duration: 5000})
      easteregg.start()
      setTimeout(() => {easteregg = false}, 5000)
      if(get(state).easterEggActive) {
        exitGameEasterEgg()
      } else {
        goToGameEasterEgg()
      }
    }
  }

</script>

<div class="wrapper">
  <img src={icon} alt="" bind:this={element} on:click={animate}>

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
    perspective: 1000px;
    position: fixed;
    inset: 0;
    z-index: -1;
  }

  img {
    position: absolute;
    right: 15%;
    bottom: 15%;
    height: 7em;
    --translate: translate(50%, 50%);
    transform: var(--translate);
    cursor: pointer;
  }

  .wrapper :global(.circle-layer) {
    position: absolute;
    right: 15%;
    bottom: 15%;
    opacity: .5;
    pointer-events: none;
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
  }
</style>