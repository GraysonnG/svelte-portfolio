<script>
  import { fly } from "svelte/transition";
  
  let email;
  let discord;

  const onClickItem = (data) => {
    return () => {
      data.element.classList.add("tooltip")
      setTimeout(() => {
        data.element.classList.remove("tooltip")
      }, 5000)

      navigator.clipboard
        .writeText(data.text)
    }
  }


</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <h2>Reach Out!</h2>
  <div>
    <p bind:this={email} on:click={onClickItem({
      element: email,
      text: "graysongullion@gmail.com"
    })}>
      <i class="fa-solid fa-inbox"></i>
      <span>graysongullion<em>@gmail.com</em></span>
    </p>
    <p>
      <i class="fa-brands fa-linkedin"></i>
      <a class="external" href="https://www.linkedin.com/in/william-grayson-gullion/" target="_blank">
        <span>Grayson Gullion</span>
        <i class="fa-solid fa-up-right-from-square"></i>
      </a>
    </p>
    <p bind:this={discord} on:click={onClickItem({
      element: discord,
      text: "Blank The Evil#6534"
    })}>
      <i class="fa-brands fa-discord"></i>
      <span>Blank The Evil<em>#6534</em></span>
    </p>
  </div>
</section>

<style>
  section {
    font-size: 1.5em;
    position: absolute;
    left: 0;
    top: calc(50% - 12em);
    transition: all 500ms;
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 50%;
  }

  div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1em;
  }

  i {
    font-size: 1.5em;
    width: 1.5em;
    text-align: center;
  }

  p {
    width: fit-content;
    display: inline-flex;
    gap: 0.5em;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: white;
    transition: all 250ms;
  }

  a > i {
    font-size: 1rem;
    color: var(--color-highlight)
  }

  a.external {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    position: relative;
    transition: all 250ms;
  }

  p:hover, a:hover, p:hover a {
    color: var(--color-highlight);
  }

  p:active {
    transform: scale(1.1);
  }

  p::after {
    position: absolute;
    content: "Copied!";
    background-color: var(--color-highlight);
    color: white !important;
    right: 0;
    top: 50%;
    font-size: 0.75rem;
    transform: translate(calc(100% + 0.5em), -50%);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    opacity: 0;
    transition: all 250ms;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    user-select: none;
    pointer-events: none;
  }

  section :global(p.tooltip::after) {
    opacity: 1;
  }

  @media screen and (max-width: 600px) {
    section {
      top: 50%;
      transform: translateY(-50%);
      padding: 0 1em;
      text-align: center;
      width: 100%;
    }

    div {
      flex-direction: column;
    }

    p {
      margin: 0 auto;
    }
  }
</style>