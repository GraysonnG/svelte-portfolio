<script>
  // @ts-nocheck
  import { goToScreen, state } from "../stores/main";
  import { fade } from "svelte/transition";
  import { clickOutside } from "../utils/clickoutside";
  import { ABOUT, CONTACT, HOME, PROJECTS } from "../constants";

  export let show = false

  const closeMenu = () => {
    state.update(oldstate => {
      oldstate.headerHidden = true
      return oldstate
    })
  }

  const openMenu = () => {
    state.update(oldstate => {
      oldstate.headerHidden = false
      return oldstate
    })
  }

  const onMenuClick = (itemId) => {
    return () => {
      closeMenu()
      goToScreen(itemId)
    }
  }
</script>

{#if show}
  <header
    use:clickOutside
    on:click_outside={closeMenu}
    class:hidden={$state.headerHidden}
    transition:fade={{duration: 1000, delay: 2000}}>
    <ul>
      <li 
        class:selected={$state.screenName === HOME} 
        on:click={onMenuClick(HOME)} 
        class="grow">
        <span>Home</span>
      </li>
      <li 
        class:selected={$state.screenName === PROJECTS} 
        on:click={onMenuClick(PROJECTS)}>
        <span>Projects</span>
      </li>
      <li 
        class:selected={$state.screenName === ABOUT} 
        on:click={onMenuClick(ABOUT)}>
        <span>About</span>
      </li>
      <li 
        class:selected={$state.screenName === CONTACT}
        on:click={onMenuClick(CONTACT)}>
        <span>Contact</span>
      </li>
    </ul>
  </header>
  <button 
    class:hidden={$state.headerHidden} 
    on:click={openMenu}>
    <i class="fa-solid fa-bars"></i>
  </button>
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

  li.selected {
    color: var(--color-highlight);
    border-bottom: 2px solid var(--color-highlight);
    transform: translateY(-0.5rem);
  }

  button {
    transition: all 250ms;
    position: fixed;
    top: -100%;
  }

  i {
    font-size: 3rem;
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

    li:hover {
      transform: translateY(0);
    }

    li.grow {
      margin-right: 0;
    }

    li.selected {
      transform: translateY(0);
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