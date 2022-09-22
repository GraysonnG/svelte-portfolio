<script>
  import { sineIn } from "svelte/easing";
  import { addEntity } from "../gamestate";

  
  export let coin;
  let left = 0
  let top = 0

  addEntity(({ map, player }, dt) => {
    coin.x += coin.vx * dt
    coin.y += coin.vy * dt

    left = coin.x * map.tileSize
    top = coin.y * map.tileSize

    const ml = 0.25
    const dx = coin.x - player.position.x
    const dy = coin.y - player.position.y
    const dl = Math.sqrt(dx * dx + dy * dy)

    if (dl < ml) {
      const norm = {
        x: dx / dl,
        y: dy / dl,
      }

      console.log(norm)

      const mx = sineIn(norm.x)
      const my = sineIn(norm.y)

      console.log({mx, my})

      coin.vx = norm.x * -2 * mx
      coin.vy = norm.y * -2 * mx
    } else {
      coin.vy *= 0.9
      coin.vx *= 0.9
    }
  })
</script>

<div class="coin" style="
  left: {left}px;
  top: {top}px;
"><span></span></div>

<style>
  .coin {
    font-size: 1rem;
    display: flex;
    position: absolute;
    background-color: rgb(255, 255, 150, 0.7);
    aspect-ratio: 1;
    width: 1.5rem;
    color: black;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 900;
    animation: spin 1000ms linear infinite;
    transform: translate(-50%, -50%);
  }

  .coin span {
    display: block;
    width: 4px;
    height: 50%;
    border-radius: 2px;
    background-color: rgb(255, 255, 150, 0.7);
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotateY(0deg);
    }

    to {
      transform: translate(-50%, -50%) rotateY(180deg);
    }
  }
</style>