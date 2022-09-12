import { enemies, gunTimer, map, player, projectiles } from "../gamestate"

export const liveState = {
  player: null,
  projectiles: null,
  enemies: null,
  map: {
    tiles: [],
    tileSize: 0,
  },
}

// player.subscribe(plr => {
//   liveState.player = plr
// })

// projectiles.subscribe(proj => {
//   liveState.projectiles = proj
// })

// enemies.subscribe(enm => {
//   liveState.enemies = enm
// })

// map.subscribe(mapp => {
//   liveState.map = mapp
// })