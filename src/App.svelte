<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { swipe } from "svelte-gestures";
  import Header from "./lib/Header.svelte";
  import Loading from "./lib/Loading.svelte";
  import { state } from "./stores/main";

  onMount(() => {
    setTimeout(() => {
      state.update(oldState => {
        oldState.loading = false;
        return oldState
      })
    }, 2000)
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
</main>

<style>
  main {
    position: relative;
    width: min(calc(1920px - 1em), calc(100% - 10em));
    min-height: 100%;
  }

  @media screen and (max-width: 600px) {
    main {
      width: 100vw;
      padding: 0 1em;
    }
  }
</style>
