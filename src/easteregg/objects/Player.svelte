<script>
  import { addEntity, handlePlayerCollision, player } from "../gamestate"
  import Arrow from "./Arrow.svelte"


  addEntity((props, dt) => {
    player.update(p => {
      p.position.x += dt * p.velocity.x
      p.position.y += dt * p.velocity.y

      handlePlayerCollision(
        p,
        props.coins,
        props.map,
      )

      return p
    })
  })
</script>

<div class="player" style="--player-size: {$player.size}px;">
  <Arrow />
</div>


<style>
  .player {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--player-size);
    height: var(--player-size);
    transform: translate(-50%, -50%);
    background-color: var(--color-highlight);
  }
</style>