<script>
  import { addEntity } from "../gamestate";
  import { doEnemyMovement, handleEnemyCollision } from "../helpers/enemyhelper";
  export let enemy;

  const getIcon = (s) => {
    switch (s) {
      case "small":
        return "bug"
      case "medium":
        return "spider"
      case "large":
        return "spaghetti-monster-flying"
    }
  }

  const getEms = (s) => {
    switch (s) {
      case "small": 
        return 2.5;
      case "medium":
        return 4;
      case "large":
        return 5;
    }
  }

  const getColor = (s) => {
    switch (s) {
      case "small":
        return "rgb(150,255,150)"
      case "medium":
        return "rgb(255,255,150)"
      case "large":
        return "rgb(255,150,150)"
    }
  }



  $: color = undefined
  $: ems = undefined
  $: icon = undefined
  $: left = 0
  $: top = 0
  $: hp = enemy.hp
  $: maxHp = enemy.maxHp

  addEntity((props, dt) => {
    color = getColor(enemy.size)
    ems = getEms(enemy.size)
    icon = getIcon(enemy.size)
    left = enemy.position.x * props.map.tileSize
    top = enemy.position.y * props.map.tileSize
    hp = enemy.hp
    maxHp = enemy.maxHp

    handleEnemyCollision(
      enemy,
      props.player,
      props.projectiles,
      props.map
    )

    doEnemyMovement(
      enemy,
      props.player,
      props.map,
      dt
    )
  })
</script>


<div style="
  --size: {ems}rem;
  --color: {color};
  left: {left.toFixed(3)}px;
  top: {top.toFixed(3)}px;
  " class="enemy">
  <span class="hpbar" style="--hp-percent: {(hp / maxHp * 100).toFixed(2)}%"></span>

  <i class="fa-solid fa-{icon}" />
</div>

<style>
  .enemy {
    color: transparent;
    font-size: var(--size);
    position: absolute;
    text-shadow: 0 0 5px var(--color);
    -webkit-text-stroke: 2px var(--color);
    transform: translate(-50%, -50%);
  }

  .hpbar {
    position: absolute;
    width: 100%;
    height: 3px;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
    background-color: rgba(255,255,255,0.2);
  }

  .hpbar::after {
    display: block;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: all 250ms;
    width: var(--hp-percent);
    background-color: lime;
  }

  .hpbar::before {
    display: block;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: all 250ms 300ms;
    width: var(--hp-percent);
    background-color: lightcoral;
  }
</style>
