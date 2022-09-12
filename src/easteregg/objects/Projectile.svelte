<script>
  import { fade } from "svelte/transition";
  import { addEntity } from "../gamestate";
  import { handleProjectileCollision } from "../helpers/projectilehelper";

  export let projectile
  let left = 0
  let top = 0

  addEntity((props, dt) => {
    projectile.lifespan -= dt
    projectile.position.x += dt * projectile.velocity.x
    projectile.position.y += dt * projectile.velocity.y

    left = projectile.position.x * props.map.tileSize
    top = projectile.position.y * props.map.tileSize

    handleProjectileCollision(projectile, props.enemies, props.map)
  })


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