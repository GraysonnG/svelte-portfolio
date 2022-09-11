<script>
  import { get } from "svelte/store";
  import { fade } from "svelte/transition";
  import { map } from "../gamestate";

  export let projectile
  const tileSize = get(map).tileSize

  $: left = projectile.position.x * tileSize;
  $: top = projectile.position.y * tileSize;
</script>

<div
  out:fade={{duration: 250}}
  style="
    left: {left.toFixed(1)}px;
    top: {top.toFixed(1)}px;
  "
></div>

<style>
  div {
    position: absolute;
    width: 1rem;
    height: 1rem;
    background-color: var(--color-highlight);
    transform: translate(-50%, -50%) scale(0.7);
    border-radius: 50%;
    animation: pulse 500ms ease-in-out infinite alternate;
    background: radial-gradient(white, var(--color-highlight));
  }

  div::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: 0 0 10px var(--color-highlight);
  }

  @keyframes pulse {
    from {
      transform: translate(-50%, -50%) scale(0.7);
    }

    to {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
</style>