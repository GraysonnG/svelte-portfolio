import { derived, get, writable } from "svelte/store";
import { onMount } from "svelte";
import { generateEnemies } from "./helpers/enemyhelper";
import { generateMap } from "./helpers/dungeonhelper";

let particleId = 0
export const player = writable({
  size: 32,
  position: {
    x: 1.5,
    y: 1.5,
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

export const enemies = writable({
  list: [],
})
export const projectiles = writable([])
export const ladder = writable({
  x: 0,
  y: 0,
})

export const map = writable({
  tiles: [
    [1,1,1],
    [1,2,1],
    [1,1,1],
  ],
  tileSize: 30 * 16
})

export const time = writable(0)
export const gunTimer = writable(0)

export const gamestate = writable({
  level: 0,
  paused: false,
})

export const props = deriveObject({
  enemies,
  gamestate,
  gunTimer,
  ladder,
  map,
  player,
  projectiles,
  time,
})

function deriveObject (obj) {
	const keys = Object.keys(obj);
	const list = keys.map(key => {
		return obj[key];
	});
  const out = derived(list, (array) => {
		return array.reduce((dict, value, i) => {
			dict[keys[i]] = value;
			return dict;
		}, {});
	});

	return out
}

export let listeners = []

export const addEntity = (updatefn) => {
  const element = {
    mounted: false,
    update: updatefn
  }

  listeners.push(element)

  onMount(() => {
    element.mounted = true
    return () => {
      element.mounted = false
    }
  })
}

export const newGame = () => {
  // set the player
  // set the enemies
  // set the map to a 1x1

  startLevel()
}

export const startLevel = () => {
  const level = get(gamestate).level
  const generatedMap = generateMap(level)

  map.set({
    tiles: generatedMap,
    tileSize: 30 * 16
  })

  placePlayer(generatedMap)

  const spawnedEnemies = generateEnemies(level, generatedMap)

  enemies.set({
    list: spawnedEnemies
  })

  ladder.set(
    spawnLadder(generatedMap)
  )
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

export const spawnProjectile = ({ mouseX, mouseY }) => {
  if (get(gunTimer) === 0) {
    const plyr = get(player)
    gunTimer.set(0.2)

    const vect = getVectorFromPlayerToMouse({
      mouseX,
      mouseY
    })

    projectiles.update(p => {
      p.push({
        id: ++particleId,
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
  
  const length = Math.sqrt(delta.dx * delta.dx + delta.dy * delta.dy)

  return {
    x: -(delta.dx / length),
    y: -(delta.dy / length),
  }
}

const placePlayer = (map) => {
  map.forEach((row, my) => {
    row.forEach((tile, mx) => {
      if (tile == 2) {
        player.update(p => {
          p.position.x = mx + 0.5
          p.position.y = my + 0.5

          return p
        })
      } 
    })
  })
}

const spawnLadder = (map) => {
  const validSpawns = []

  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 0) {
        validSpawns.push([x, y])
      }
    })
  })

  const spawn = validSpawns[
    Math.round(Math.random() * (validSpawns.length - 1))
  ]

  return {
    x: spawn[0] + 0.5,
    y: spawn[1] + 0.5,
  }
}