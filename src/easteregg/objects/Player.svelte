<script>
  import { addEntity, handlePlayerCollision, player } from "../gamestate"
  import { addKeyAction } from "../helpers/keyboardhelper";
  import Arrow from "./Arrow.svelte"

  addKeyAction("Shift", ({ player }) => {
    player.speed = 1.4
  })

  addKeyAction("a", ({ player }) => {
    player.velocity.x = -player.speed
  })

  addKeyAction("d", ({ player }) => {
    player.velocity.x = player.speed
  })

  addKeyAction("w", ({ player }) => {
    player.velocity.y = -player.speed
  })

  addKeyAction("s", ({ player }) => {
    player.velocity.y = player.speed
  })  

  addEntity(({player, coins, map}, dt) => {
    player.speed = 0.7
    player.position.x += player.velocity.x * dt
    player.position.y += player.velocity.y * dt

    player.velocity.x *= 0.9
    player.velocity.y *= 0.9

    player.velocity.x = +player.velocity.x.toFixed(6).substring(0, 4)
    player.velocity.y = +player.velocity.y.toFixed(6).substring(0, 4)

    handlePlayerCollision(player, coins, map)
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