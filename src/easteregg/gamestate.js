import { get, writable } from "svelte/store";

export const gamestate = writable({
  level: 0,
})

export const player = writable({
  size: 32,
  position: {
    x: 2.5,
    y: 2.5,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  hp: 3,
  speed: 1,
  coins: 0,
  items: []
})

export const enemies = writable([])
export const projectiles = writable([])

export const map = writable({
  tiles: [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ],
  tileSize: 30 * 16
})

export const time = writable(0)
export const gunTimer = writable(0)

export const newGame = () => {
  setInterval(() => {
    // spawn enemies
  }, 5000);
}

export const handlePlayerCollision = (player, map, tileSize, dt) => {
  const playerPos = player.position
  const outline = player.size / tileSize / 2

  const hb = {
    x: playerPos.x, y: playerPos.y,
    w: player.size / tileSize, h: player.size / tileSize,
    l: playerPos.x - outline, r: playerPos.x + outline,
    t: playerPos.y - outline, b: playerPos.y + outline
  }

  let x = 0
  let y = 0


  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const thb = {
        x: x, y: y,
        w: 1, h: 1,
        l: x, r: x + 1,
        t: y, b: y + 1,
      }
      const withinX = hb.r > thb.l && hb.l <= thb.r
      const withinY = hb.b > y && hb.t <= y + 1

      if (
        map[y][x] === 1 && 
        withinX &&
        withinY
      ) {

        if (thb.l - hb.r < 0 && thb.l - hb.l > 0 && Math.abs(player.velocity.x) > 0) {
          player.velocity.x = 0
          player.position.x = thb.l - outline - 0.005;
        }

        if (thb.r - hb.l > 0 && thb.r - hb.r < 0 && Math.abs(player.velocity.x) > 0) {
          player.velocity.x = 0
          player.position.x = thb.r + outline + 0.005;
        }

        if (thb.t - hb.b < 0 && thb.t - hb.t > 0 && Math.abs(player.velocity.y) > 0) {
          player.velocity.y = 0
          player.position.y = thb.t - outline - 0.005;
        }

        if (thb.b - hb.t > 0 && thb.b - hb.b < 0 && Math.abs(player.velocity.y) > 0) {
          player.velocity.y = 0
          player.position.y = thb.b + outline + 0.005;
        }

        // if ()
      }
    }
  }
}

export const handleProjectileCollision = (projectile, mapp) => {
  for (let y = 0; y < mapp.tiles.length; y++) {
    for (let x = 0; x < mapp.tiles[y].length; x++) {
      if (
        mapp.tiles[y][x] === 1 &&
        projectile.position.x > x && projectile.position.x < x + 1 &&
        projectile.position.y > y && projectile.position.y < y + 1
      ) {
        projectile.lifespan = 0
      }
    }
  }
}

export const spawnProjectile = ({ mouseX, mouseY }) => {
  if (get(gunTimer) === 0) {
    const plyr = get(player)
    gunTimer.set(0.5)

    const vect = getVectorFromPlayerToMouse({
      mouseX,
      mouseY
    })

    projectiles.update(p => {
      p.push({
        lifespan: 5,
        position: {
          x: plyr.position.x,
          y: plyr.position.y,
        },
        velocity: {
          x: vect.x * 1,
          y: vect.y * 1,
        }
      })
      return p
    })
  }
}

export const getVectorFromPlayerToMouse = ({ mouseX, mouseY }) => {
  const plrPos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }

  const delta = {
    dx: plrPos.x - mouseX,
    dy: plrPos.y - mouseY,
  }

  let norm = {
    x: 0,
    y: 0,
  }
  
  const length = Math.sqrt(delta.dx * delta.dx + delta.dy * delta.dy)

  norm.x = -(delta.dx / length)
  norm.y = -(delta.dy / length)

  return norm


}