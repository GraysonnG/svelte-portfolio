export const playerInLadder = (player, ladder, tileSize) => {
  const size = 4 * 16
  const dist = size / tileSize
  const deltaX = Math.abs(
    player.position.x - ladder.x
  )
  const deltaY = Math.abs(
    player.position.y - ladder.y
  )

  return deltaX < dist && deltaY < dist
}