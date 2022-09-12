import { spawnCoins } from "../gamestate"

let enemyId = 0

export const generateEnemies = (level, map) => {
  const out = []
  const validSpawns = []
  const numOfEnemies = 10 + (level * 2)

  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 0) {
        validSpawns.push([x, y])
      }
    })
  })

  for (let i = 0; i < numOfEnemies; i++) {
    const validSpawnNum = Math.round(
      Math.random() * (validSpawns.length - 1)
    )

    const size = getEnemySize(level)

    out.push({
      id: ++enemyId,
      size,
      hp: getEnemyHP(size),
      maxHp: getEnemyHP(size),
      dTimer: 0,
      position: {
        x: validSpawns[validSpawnNum][0] + 0.25 + (0.5 * Math.random()),
        y: validSpawns[validSpawnNum][1] + 0.25 + (0.5 * Math.random()),
      },
      velocity: {
        x: 0,
        y: 0,
      }
    })
  }
  return out
}

export const getEnemySize = (level) => {
  let out = "small"
  const rand = Math.random()

  if (rand > .66) out = "medium"
  if (rand > .90) out = "large"

  return out;
}

export const getEnemyHP = (size) => {
  let hp = 2

  if (size === "medium") hp = 3
  if (size === "large") hp = 5

  return hp
}

export const getEnemySpeed = (size) => {
  let speed = 0.7

  if (size === "medium") speed = 0.6
  if (size === "large") speed = 0.5

  return speed
}

export const getEnemyCoins = (size) => {
  let coins = 1

  if (size === "medium") coins = 3
  if (size === "large") coins = 5

  return coins;
}

export const getEnemyPx = (size) => {
  let px = 20

  if (size === "medium") px = 32
  if (size === "large") px = 40

  return px
}

export const handleEnemyCollision = (
  enemy, 
  player, 
  projectiles, 
  map,
) => {
  // map collision logic

  // player collision logic
  // projectiles collision logic
  

  projectiles.forEach(projectile => {
    const withinEnemy = pointWithinEnemy(projectile.position, enemy, map.tileSize)
    if (withinEnemy) {
      projectile.lifespan = 0
      enemy.hp -= 1

      if (enemy.hp === 0) {
        spawnCoins(enemy, getEnemyCoins(enemy.size))
      }
    }
  })
}

export const pointWithinEnemy = (point, enemy, tileSize) => {
  let size = 20
  if (enemy.size === "medium") size = 32
  if (enemy.size === "large") size = 40
  const dist = size / tileSize
  const deltaX = Math.abs(point.x - enemy.position.x)
  const deltaY = Math.abs(point.y - enemy.position.y)

  return deltaX < dist && deltaY < dist
}

export const playerNearby = (playerPos, enemy, tileSize) => {
  const deltaX = Math.abs(playerPos.x - enemy.position.x)
  const deltaY = Math.abs(playerPos.y - enemy.position.y)

  return deltaX < tileSize * 1.5 && deltaY < tileSize * 1.5
}

export const setRandomDirection = (enemy) => {
  const speed = getEnemySpeed(enemy.size)
  enemy.velocity.x = (Math.random() * speed) - speed / 2
  enemy.velocity.y = (Math.random() * speed) - speed / 2
  enemy.dTimer = Math.random() * 5
}

export const setOppositeDirection = (enemy) => {
  enemy.velocity.x = -enemy.velocity.x
  enemy.velocity.y = -enemy.velocity.y
  enemy.dTimer = (Math.random() * 5) + 0.1
}

export const doEnemyMovement = (enemy, player, map, dt) => {
  enemy.dTimer -= dt
  enemy.position.x += enemy.velocity.x * dt
  enemy.position.y += enemy.velocity.y * dt

  handleCollidingWithWall(enemy, map, dt)

  if (enemy.dTimer <= 0) {
    setRandomDirection(enemy)
  }

  


  // if not playerNearby()
  //   do random movement
  // else
  //   move towards the player
}

export const handleCollidingWithWall = (enemy, map, dt) => {
  const px = getEnemyPx(enemy.size)
  const outline = px / map.tileSize
  const hb = {
    x: enemy.position.x, y: enemy.position.y,
    w: px / map.tileSize, h: px / map.tileSize,
    l: enemy.position.x - outline, r: enemy.position.x + outline,
    t: enemy.position.y - outline, b: enemy.position.y + outline,
  }

  map.tiles.forEach((row, y) => {
    row.forEach((tile, x) => {
      const thb = {
        x: x, y: y,
        w: 1, h: 1,
        l: x, r: x + 1,
        t: y, b: y + 1,
      }
      const withinX = hb.r > thb.l && hb.l <= thb.r
      const withinY = hb.b > thb.t && hb.t <= thb.b

      if (
        tile === 1 &&
        withinX &&
        withinY
      ) {
        setOppositeDirection(enemy)
        enemy.position.x += enemy.velocity.x * dt
        enemy.position.y += enemy.velocity.y * dt
      }
    })
  })

}