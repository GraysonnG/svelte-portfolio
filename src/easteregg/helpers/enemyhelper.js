let enemyId = 0

export const generateEnemies = (level, map) => {
  const out = []
  const validSpawns = []

  map.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 0) {
        validSpawns.push([x, y])
      }
    })
  })

  for (let i = 0; i < 10; i++) {
    const validSpawnNum = Math.round(
      Math.random() * (validSpawns.length - 1)
    )

    const size = getEnemySize(level)

    out.push({
      id: ++enemyId,
      size,
      hp: getEnemyHP(size),
      maxHp: getEnemyHP(size),
      position: {
        x: validSpawns[validSpawnNum][0] + 0.25 + (0.5 * Math.random()),
        y: validSpawns[validSpawnNum][1] + 0.25 + (0.5 * Math.random()),
      },
    })
  }
  return out
}

export const getEnemySize = (level) => {
  let out = "small"
  const rand = Math.random()

  if (rand > .66) {
    out = "medium"
  }

  if (rand > .90) {
    out = "large"
  }

  return out;
}

export const getEnemyHP = (size) => {
  let hp = 2

  if (size === "medium") {
    hp = 3
  }

  if (size === "large") {
    hp = 5
  }

  return hp
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

      console.log(enemy.hp)
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