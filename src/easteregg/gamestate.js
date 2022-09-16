import { derived, get, writable } from "svelte/store";
import { onMount } from "svelte";
import { generateEnemies } from "./helpers/enemyhelper";
import { generateMap } from "./helpers/dungeonhelper";

let particleId = 0
const playerInitialState = {
  size: 32,
  position: {
    x: 1.5,
    y: 1.5,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  hp: 5,
  iTimer: 0,
  speed: 0.7,
  coins: 0,
  items: []
}

const ladderInitialState = {
  x: 0,
  y: 0,
}

const mapInitialState = {
  tiles: [
    [1,1,1],
    [1,2,1],
    [1,1,1],
  ],
  tileSize: 30 * 16
}

const enemiesInitialState = { list: [] }

const gameInitialState = {
  level: 0,
  paused: false,
}


export const player = writable(deepCopy(playerInitialState))
export const enemies = writable(deepCopy(enemiesInitialState))
export const projectiles = writable([])
export const coins = writable([])
export const ladder = writable(deepCopy(ladderInitialState))
export const map = writable(deepCopy(mapInitialState))
export const time = writable(0)
export const gunTimer = writable(0)
export const gamestate = writable(deepCopy(gameInitialState))
export const props = deriveObject({
  coins,
  enemies,
  gamestate,
  gunTimer,
  ladder,
  map,
  player,
  projectiles,
  time,
})

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

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
  player.set(deepCopy(playerInitialState))
  enemies.set(deepCopy(enemiesInitialState))
  projectiles.set([])
  coins.set([])
  ladder.set(deepCopy(ladderInitialState))
  map.set(deepCopy(ladderInitialState))
  time.set(0)
  gunTimer.set(0)
  gamestate.set(deepCopy(gameInitialState))

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

export const spawnCoins = (enemy, amt = 1, area = 0.2) => {  
  coins.update(c => {
    for (let i = 0; i < amt; i++) {
      c.push({
        sx: enemy.position.x,
        sy: enemy.position.y,
        x: enemy.position.x + (area / 2) - (Math.random() * area),
        y: enemy.position.y + (area / 2) - (Math.random() * area),
        dead: false,
      })
    }

    return c
  })
}

export const handlePlayerCollision = (player, coins, map) => {
  const playerPos = player.position
  const outline = player.size / map.tileSize / 2

  const hb = {
    x: playerPos.x, y: playerPos.y,
    w: player.size / map.tileSize, h: player.size / map.tileSize,
    l: playerPos.x - outline, r: playerPos.x + outline,
    t: playerPos.y - outline, b: playerPos.y + outline
  }

  let x = 0
  let y = 0


  for (let y = 0; y < map.tiles.length; y++) {
    for (let x = 0; x < map.tiles[y].length; x++) {
      const thb = {
        x: x, y: y,
        w: 1, h: 1,
        l: x, r: x + 1,
        t: y, b: y + 1,
      }
      const withinX = hb.r > thb.l && hb.l <= thb.r
      const withinY = hb.b > y && hb.t <= y + 1

      if (
        map.tiles[y][x] === 1 && 
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
      }
    }
  }

  coins.forEach(coin => {
    const deltaX = Math.abs(coin.x - playerPos.x)
    const deltaY = Math.abs(coin.y - playerPos.y)
    const size = 20
    const dist = size / map.tileSize

    if (deltaX < dist && deltaY < dist) {
      player.coins ++
      coin.dead = true
    }
  })
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