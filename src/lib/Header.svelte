<script>
  // @ts-nocheck
  import { goToScreen } from "../stores/main";
  import { fade } from "svelte/transition";
  import { clickOutside } from "../utils/clickoutside";

  export let show = false
  export let hidden = true

  const closeMenu = () => {
    hidden = true
  }

  const openMenu = () => {
    hidden = false
  }

  const onMenuClick = (itemId) => {
    return () => {
      hidden = true

      goToScreen(itemId)
    }
  }
</script>

{#if show}
  <header
    use:clickOutside
    on:click_outside={closeMenu}
    class:hidden 
    transition:fade={{duration: 1000, delay: 1000}}>
    <ul>
      <li on:click={onMenuClick("home")} class="grow">
        <span>Home</span>
      </li>
      <li on:click={onMenuClick("projects")}>
        <span>Projects</span>
      </li>
      <li on:click={onMenuClick("about")}>
        <span>About</span>
      </li>
      <li on:click={onMenuClick("contact")}>
        <span>Contact</span>
      </li>
    </ul>
  </header>
  <button class:hidden on:click={openMenu}>Yeet</button>
{/if}

<style>
  header {
    width: 100%;
    transition: all 250ms;
    transform-origin: top;
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
    color: var(--color-highlight);
    border-bottom: 2px solid var(--color-highlight);
    transform: translateY(-0.5rem);
  }

  li.grow {
    margin-right: auto;
  }

  button {
    position: fixed;
    top: -100%;
  }

  @media screen and (max-width: 600px) {
    header {
      left: 0;
      top: 0;
      max-width: 100%;
      position: fixed;
      background-color: rgba(0,0,0,0.8);
      z-index: 10000;
      
    }

    ul {
      gap: 0.5em;
      flex-direction: column;
      padding: 1em 0;
      
    }

    li.grow {
      margin-right: 0;
    }

    span {
      margin-left: 1em;
    }

    header.hidden {
      transform: scaleY(0);
    }

    button.hidden {
      left: 1em;
      top: 1em;
      border: none;
      background-color: transparent;
      color: white;
    }
  }
</style>