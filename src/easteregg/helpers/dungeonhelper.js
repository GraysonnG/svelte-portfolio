
export const generateMap = (level) => {
  const mapSize = 11 + (1 * level)
  const numberOfRooms = 3 + Math.round(level * Math.random())

  const map = []

  for (let y = 0; y < mapSize; y++) {
    map.push([])
    for (let x = 0; x < mapSize; x++) {
      map[y].push(1)
    }
  }

  const rooms = []
  for (let i = 0; i < numberOfRooms; i++) {
    try {
      getRandomRoomPos(map, rooms)
    } catch (e) {}
  }

  rooms.forEach((curr, i) => {
    if (i > 0) {
      connectRooms(rooms[i - 1], curr, map)
    }
  });

  const spawnRoom = Math.round(Math.random() * (rooms.length - 1))
  const [spawnX, spawnY] = rooms[spawnRoom]
  map[spawnY][spawnX] = 2

  let line = ""
  for(let y = 0; y < map.length; y++) {
    
    
    for(let x = 0; x < map[y].length; x++) {
      line += `${map[y][x] === 1 ? "# " : "  "}`
    }

    line += "\n"
  }

  console.log(line)

  return map
}

function getRandomRoomPos(map, rooms) {
  const minRoomNum = 2
  const maxRoomNum = map.length - 3
  const deltaRoomNum = maxRoomNum - minRoomNum

  const randomX = minRoomNum + Math.round(Math.random() * deltaRoomNum)
  const randomY = minRoomNum + Math.round(Math.random() * deltaRoomNum)

  if (canSpawn(randomX, randomY, map)) {
    markRoomAsOpen(randomX, randomY, map)
    rooms.push([randomX, randomY])
  } else {
    getRandomRoomPos(map, rooms)
  }
}

function markRoomAsOpen(cx, cy, map) {
  for(let i = cy - 1; i < cy + 2; i++) {
    for (let j = cx - 1; j < cx + 2; j++) {
      map[i][j] = 0
    }
  }
}

function connectRooms([x1, y1], [x2, y2], map) {
  const [ax, ay] = [x1, y2]
  const [bx, by] = [x2, y1]
  const isA = Math.random() > 0.5

  if (isA) {
    const startX = Math.min(ax, x2)
    const endX = Math.max(ax, x2)

    const startY = Math.min(ay, y1)
    const endY = Math.max(ay, y1)

    for (let i = startX; i < endX + 1; i++) {
      map[ay][i] = 0
    }

    for (let i = startY; i < endY + 1; i++) {
      map[i][ax] = 0
    }
  } else {
    const startX = Math.min(bx, x1)
    const endX = Math.max(bx, x1)

    const startY = Math.min(by, y2)
    const endY = Math.max(by, y2)

    for (let i = startX; i < endX + 1; i++) {
      map[by][i] = 0
    }

    for (let i = startY; i < endY + 1; i++) {
      map[i][bx] = 0
    }
  }
}

function canSpawn(x, y, map) {
  let out = true
  
  for (let i = y - 2; i < y + 3; i++) {
    for (let j = x - 2; j < x + 3; j++) {
      if (map[i][j] === 0) out = false
    }
  }

  return out
}


function Room(x, y, i) {
  
}