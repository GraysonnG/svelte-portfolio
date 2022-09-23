<script>
  import { onDestroy, onMount } from "svelte";
  import { swipe } from "svelte-gestures";
  import { create_in_transition } from "svelte/internal";
  import CircleEffect from "./lib/CircleEffect.svelte";
  import Header from "./lib/Header.svelte";
  import Loading from "./lib/Loading.svelte";
  import VfxLayer from "./lib/VFXLayer.svelte";
  import { goToNextScreen, goToPreviousScreen, state } from "./stores/main";
  import { expand } from "./transitions/expand";
  
  let cursor;
  let cursorLeft = "85%"
  let cursorTop = "85%"
  let cursorClick;
  let cursorAttached = false;
  let body;

  const attachFXToCursor = () => {
    if (!cursorAttached) {
      document.addEventListener("mousemove", (e) => {
        cursorLeft = `${e.clientX}px`
        cursorTop = `${e.clientY}px`
      })

      document.addEventListener("click", () => {
        try {
          const clickDur = 100
          cursorClick = create_in_transition(cursor, expand, { duration: clickDur, inwards: true })
          cursorClick.start()
        } catch (e) { /* swallow error */ }
      })
      cursorAttached = true
    }
  }

  let unsub = state.subscribe(s => {
    if (s.easterEggActive) {
      attachFXToCursor()
    }

    if (body) {
      if (s.easterEggActive) {
        body.classList.add("no-cursor")
      } else {
        body.classList.remove("no-cursor")
      }
    }
  })

  onMount(() => {
    setTimeout(() => {
      state.update(oldState => {
        oldState.loading = false;
        return oldState
      })
    }, 1500)

    if (cursor) {
      attachFXToCursor(cursor)
    }

    body = document.body
  })

  onDestroy(() => {
    unsub()
  })

  const onAppSwiped = (e) => {
    if (e.detail.direction === "bottom") {
      state.update(oldState => {
        oldState.headerHidden = false
        return oldState
      })
    }

    if (e.detail.direction === "top") {
      state.update(oldState => {
        oldState.headerHidden = true
        return oldState
      })
    }
  }

  window.onkeydown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        goToPreviousScreen()
        break;
      case "ArrowRight":
        goToNextScreen()
        break;
    }
  }
</script>

<main
  on:swipe={onAppSwiped}
  use:swipe={{
    timeframe: 1000,
    minSwipeDistance: 10
  }}>
  <Header show={!$state.loading} />
  <svelte:component this={$state.screen} />
  <Loading />
  <VfxLayer />
  {#if $state.easterEggActive}
    <div bind:this={cursor} class="cursor" style="left:{cursorLeft}; top:{cursorTop};">
      <CircleEffect size="2.25rem" color="rgba(255, 255, 255, 0.5)"/>
    </div>
  {/if}
</main>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;400;600&display=swap" rel="stylesheet"> 
  <link rel="stylesheet" href="/global.css">
</svelte:head>

<style>
  :global(body.no-cursor *) {
    cursor: none !important;
  }


  main {
    position: relative;
    width: min(calc(100vw - 16em), 1600px);
    min-height: 100%;
    z-index: 2;
  }

  .cursor {
    display: block;
    position: fixed;
    width: 3rem;
    height: 3rem;
    aspect-ratio: 1;
    z-index: 20000;
    border: 1px dashed white;
    outline: 1px solid white;
    outline-offset: 0.33rem;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }

  .cursor :global(.circle-layer) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .cursor::after {
    position: absolute;
    content: "";
    display: block;
    inset: 35%;
    border-radius: 100%;
    border: 2px solid white;
    background-color: var(--color-highlight);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  }

  :global(span.ripple) {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgb(255, 255, 255, 0.7);
    pointer-events: none;
    user-select: none;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @media screen and (max-width: 820px) {
    main {
      width: calc(100vw - 2em);
      padding: 0 1em;
    }
  }

  @media screen and (max-width: 600px) {
    main {
      width: 100vw;
      padding: 0 1em;
    }
  }
</style>
