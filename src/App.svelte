<script>
  import { onMount } from "svelte";
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
</script>

<main>
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
