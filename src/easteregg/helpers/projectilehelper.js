export const handleProjectileCollision = (projectile, enemies, map) => {
  for (let y = 0; y < map.tiles.length; y++) {
    for (let x = 0; x < map.tiles[y].length; x++) {
      if (
        map.tiles[y][x] === 1 &&
        projectile.position.x > x && projectile.position.x < x + 1 &&
        projectile.position.y > y && projectile.position.y < y + 1
      ) {
        projectile.velocity.x = 0
        projectile.velocity.y = 0
      }
    }
  }

  enemies.list.forEach(enemy => {
    const deltaX = Math.abs(projectile.position.x - enemy.position.x)
    const deltaY = Math.abs(projectile.position.y - enemy.position.y)

    let size = 20

    if (enemy.size === "medium") {
      size = 32
    }

    if (enemy.size === "large") {
      size = 40
    }

    const dist = size / map.tileSize

    if (
      deltaX < dist &&
      deltaY < dist
    ) {
      projectile.velocity.x = 0
      projectile.velocity.y = 0
    }
  });
}