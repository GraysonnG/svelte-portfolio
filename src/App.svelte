<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { swipe } from "svelte-gestures";
  import Header from "./lib/Header.svelte";
  import Loading from "./lib/Loading.svelte";
  import VfxLayer from "./lib/VFXLayer.svelte";
  import { goToNextScreen, goToPreviousScreen, state } from "./stores/main";

  onMount(() => {
    setTimeout(() => {
      state.update(oldState => {
        oldState.loading = false;
        return oldState
      })
    }, 1500)
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
</main>

<style>
  main {
    position: relative;
    width: min(calc(100vw - 16em), 1600px);
    min-height: 100%;
    z-index: 2;
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
