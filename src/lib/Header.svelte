<script>
  import Projects from "../routes/Projects.svelte";
  import { state } from "../stores/main";
  import { fade } from "svelte/transition";
  import Home from "../routes/Home.svelte";

  export let show = false

  const onMenuClick = (itemId) => {
    return () => {
      state.update(oldstate => {
        console.log(itemId)
        switch (itemId) {
          default:
          case "home":
            oldstate.screen = Home
            return oldstate
          case "projects":
            oldstate.screen = Projects
            return oldstate
            
        }
      })
    }
  }
</script>

{#if show}
  <header transition:fade={{duration: 1000, delay: 1000}}>
    <ul>
      <li on:click={onMenuClick("home")} class="grow">Home</li>
      <li on:click={onMenuClick("projects")}>Projects</li>
      <li on:click={onMenuClick("about")}>About</li>
      <li on:click={onMenuClick("contact")}>Contact</li>
    </ul>
  </header>
{/if}

<style>
  header {
    width: 100%;
  }

  ul {
    font-size: 2em;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2em;
    padding: 2em 0;
  }

  li {
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 500ms;
    user-select: none;
  }

  li:hover {
    border-bottom: 2px solid white;
  }

  li.grow {
    margin-right: auto;
  }
</style>