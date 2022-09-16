<script>
  import { fly } from "svelte/transition"
  import { 
    time, 
    map, 
    spawnProjectile, 
    gunTimer, 
    newGame, 
    listeners, 
    props, 
    projectiles, 
    enemies, 
    coins,
  } from "./gamestate";
  import { runKeyActions, setKeyActionPressed } from "./helpers/keyboardhelper";
  import Player from "./objects/Player.svelte";
  import Map from "./Map.svelte";
  import { onDestroy, onMount } from "svelte";
  import StatsUI from "./objects/StatsUI.svelte";
  import { exitGameEasterEgg } from "../stores/main";
  import Minimap from "./objects/Minimap.svelte";
  import GameOver from "./objects/GameOver.svelte";
  import GameStart from "./objects/GameStart.svelte";

  let keyDownListener;
  let keyUpListener;
  let clickListener;
  let frame;

  onMount(() => {
    keyDownListener = (e) => {
      setKeyActionPressed(e.key, true)
    }

    keyUpListener = (e) => {
      setKeyActionPressed(e.key, false)
    }

    clickListener = (e) => {
      spawnProjectile({
        mouseX: e.clientX,
        mouseY: e.clientY,
      })
    }

    window.addEventListener("keydown", keyDownListener)
    window.addEventListener("keyup", keyUpListener)

    newGame()

    return createLoop((elapsed, dt) => {
      time.set(elapsed)
      update(dt)
    })
  })

  onDestroy(() => {
    window.removeEventListener("keydown", keyDownListener)
    window.removeEventListener("keyup", keyUpListener)
  })

  function update(dt) {
    runKeyActions($props, dt)
    console.log($props)

    listeners.forEach(entity => {
      try {
        if ($props.gamestate && !$props.gamestate.paused) {
          entity.update($props, dt)
        }
      } catch (e) {
        console.error(e)
        cancelAnimationFrame(frame)
      }
    })

    for(let i = listeners.length - 1; i >= 0; i--) {
      if (!listeners[i].mounted) {
        listeners.splice(i, 1)
      }
    }

    gunTimer.update(t => {
      return Math.max(t - dt, 0)
    })


    projectiles.update(ps => {
      for(let i = ps.length - 1; i >= 0; i--) {
        ps[i].lifespan -= dt;
        if (ps[i].lifespan <= 0) {
          ps.splice(i, 1)
        }
      }
      return ps
    })

    enemies.update(obj => {
      const enm = obj.list
      for(let i = enm.length - 1; i >= 0; i--) {
        if (enm[i].hp <= 0) {
          enm.splice(i, 1)
        }
      }
      return obj
    })

    coins.update(cns => {
      for (let i = cns.length - 1; i >= 0; i--) {
        if (cns[i].dead) {
          cns.splice(i, 1)
        }
      }
      return cns
    })
  }

  function createLoop(fn) {
    let elapsed = 0;
    let lastTime = performance.now()
    let loop = () => {
      frame = requestAnimationFrame(loop);
      const beginTime = performance.now();
      const dt = (beginTime - lastTime) / 1000;
      lastTime = beginTime;
      elapsed += dt;
      fn(elapsed, dt)
    }
    loop()
    return () => {
      cancelAnimationFrame(frame)
    }
  }

</script>

<section transition:fly={{ duration: 1000, y: 1000 }} >
  <div class="game-area" on:click={clickListener}>
    <Player />
    <Map {...$map} />
  </div>
  <Minimap />
  <GameStart />
  <GameOver />
  <StatsUI />
  <button class="close-button" on:click={exitGameEasterEgg}>
    <i class="fa fa-close" />
  </button>
</section>

<style>
  section {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(1600px, calc(100vw - 10rem));
    aspect-ratio: 16/9;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1em;
    backdrop-filter: blur(5px);
  }

  .game-area {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  section::before, section::after {
    content: "";
    position: absolute;
    border-color: var(--color-highlight);
    width: 5em;
    height: 5em;
  }

  section::before {
    top: -0.5em;
    left: -0.5em;
    border-left: 1px solid var(--color-highlight);
    border-top: 1px solid var(--color-highlight);
  }

  section::after {
    bottom: -0.5em;
    right: -0.5em;
    border-right: 1px solid var(--color-highlight);
    border-bottom: 1px solid var(--color-highlight);
  }

  .close-button {
    color: white;
    position: absolute;
    display: flex;
    top: 0;
    right: 0;
    background-color: var(--color-highlight);
    border: none;
    aspect-ratio: 1;
    padding: 1rem;
    margin: 0;
    justify-content: center;
    align-items: center;
    line-height: 1;
    transform: translate(50%, -50%);
    outline: 1px solid rgba(255, 255, 255, 0.5);
    outline-offset: 0.25rem;
    transition: all 250ms;
  }

  .close-button:hover {
    background-color: rgba(255, 100, 100, 1);
    transform: translate(50%, -50%) scale(1.1);
  }

  .close-button:active {
    background-color: rgba(255, 150, 150, 1);
    transform: translate(50%, -50%) scale(0.9);
  }
</style>