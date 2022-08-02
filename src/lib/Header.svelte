<script>
  // @ts-nocheck
  import { goToScreen, state } from "../stores/main";
  import { fade } from "svelte/transition";
  import { clickOutside } from "../utils/clickoutside";
  import { data } from "../content/header";
  import { onMount } from "svelte";

  export let show = false
  
  let underline

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

  const moveToRect = (rect) => {
    if (rect && underline) {
      underline.style.left = `${rect.left}px`;
      underline.style.width = `${rect.width}px`;
      underline.style.height = `${rect.height}px`;
      underline.style.top = `${rect.top}px`;
      underline.style.opacity = `1`;
    }
  }

  const moveUnderline = (e) => {
    const rect = e.target.getBoundingClientRect()
    moveToRect(rect)
  }

  const moveUnderlineToSelected = () => {
    try {
      const rect = document.querySelector(`header .selected`).getBoundingClientRect()
      moveToRect(rect)
    } catch (e) {}
  }

  const moveUnderlineToElement = (element) => {
    if (element) {
      const rect = element.getBoundingClientRect()
      moveToRect(rect)
    }
  }

  window.onresize = () => {
    moveUnderlineToSelected()
  }

  onMount(() => {
    moveUnderlineToSelected()

    state.subscribe(st => {
      const selectedElement = document.querySelector(`header li[data-id='${st.screenName}']`)
      moveUnderlineToElement(selectedElement)
    })
  })
</script>

{#if show}
  <header
    use:clickOutside
    on:click_outside={closeMenu}
    class:hidden={$state.headerHidden}
    on:introend={() => {
      moveUnderlineToSelected()
    }}
    transition:fade={{duration: 1000, delay: 2000}}>
    <div class="underline" bind:this={underline}></div>
    <ul on:mouseleave={moveUnderlineToSelected}>
      {#each data.pages as item (item.id)}
        <li
          class:selected={$state.screenName === item.id}
          on:click={onMenuClick(item.id)}
          on:mouseenter={moveUnderline}
          data-id={item.id}
          class:grow={item.grow}>
          <span>{ item.name }</span>
        </li>
      {/each}
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
    position: relative;
  }

  button {
    z-index: 20000;
  }

  .underline {
    height: 2px;
    background-color: var(--color-highlight);
    position: fixed;
    transition: all 200ms;
    opacity: 0;
    z-index: 1;
    border-radius: 100px;
    pointer-events: none;
  }

  ul {
    position: relative;
    font-size: 2em;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 2em;
    margin: 2em 0;
    z-index: 2;
  }

  li {
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 500ms;
    user-select: none;
    padding: 0.5rem 2rem;
    border-radius: 100px;
    border: 1px solid transparent;
  }

  li:hover {
    color: white;
  }

  li.grow {
    margin-right: auto;
  }

  li.selected {
    color: white;
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
      top: 1em;
      max-width: 100%;
      position: fixed;
      z-index: 10000;
      
    }

    .underline {
      display: none;
    }

    ul {
      gap: 0em;
      flex-direction: column;
      padding: 0;
      border: none;
    }

    li {
      position: relative;
      border: none;
      padding: 0.25em 0;
      border-radius: 0;
      border: none !important;
    }

    li:nth-child(-n+6) {
      left: 0;
      transition: all 250ms;
    }

    li:nth-child(1) {
      transition-delay: 0ms;
    }

    li:nth-child(2) {
      transition-delay: 100ms;
    }

    li:nth-child(3) {
      transition-delay: 200ms;
    }

    li:nth-child(4) {
      transition-delay: 300ms;
    }

    li:nth-child(5) {
      transition-delay: 400ms;
    }

    li:nth-child(6) {
      transition-delay: 500ms;
    }

    .hidden li {
      left: -100%;
    }

    li:hover {
      transform: translateY(0);
    }

    li.grow {
      margin-right: 0;
    }

    li.selected {
      transform: translateY(0);
      border: none;
    }

    li.selected::before {
      display: inline-block;
      font-weight: 900;
      font-family: "Font Awesome 6 Free";
      content: "\f105";
      margin-left: 1em;
      color: var(--color-highlight);
    }

    span {
      margin-left: 1em;
    }

    .selected span {
      margin-left: 0.5em;
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