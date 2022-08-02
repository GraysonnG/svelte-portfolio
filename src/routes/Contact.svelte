<script>
  import { fly } from "svelte/transition";
  import { data } from "../content/contact";

  let email;
  let discord;

  const onClickItem = (data) => {
    return () => {
      data.element.classList.add("tooltip")
      setTimeout(() => {
        data.element.classList.remove("tooltip")
      }, 5000)

      navigator.clipboard.writeText(data.text)
    }
  }
</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <h2>{data.title}</h2>
  <div transition:fly={{duration: 1000, delay: 750, x: -50}}>
    <p bind:this={email} on:click={onClickItem({
      element: email,
      text: data.email.rawText
    })}>
      {@html data.email.icon}
      <span>{@html data.email.title}</span>
    </p>
    <p>
      {@html data.linkedin.icon}
      <a class="external" href={data.linkedin.url} target="_blank">
        {@html data.linkedin.title}
      </a>
    </p>
    <p bind:this={discord} on:click={onClickItem({
      element: discord,
      text: data.discord.rawText
    })}>
      {@html data.discord.icon}
      <span>{@html data.discord.title}</span>
    </p>
    <p>
      {@html data.github.icon}
      <a class="external" href={data.github.url} target="_blank">
        {@html data.github.title}
      </a>
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

  p :global(i) {
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

  a > :global(i) {
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

  section :global(em) {
    animation: flash 5s ease-in-out infinite alternate;
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

    
    p {
      position: relative;
      left: -100%;
      animation: flyIn 1s ease-in 1 forwards;
    }

    p:nth-child(1) {
      animation-delay: 250ms;
    }

    p:nth-child(2) {
      animation-delay: 500ms;
    }

    p:nth-child(3) {
      animation-delay: 750ms;
    }

    p:nth-child(4) {
      animation-delay: 1000ms;
    }

    p:nth-child(5) {
      animation-delay: 1250ms;
    }

    p:nth-child(6) {
      animation-delay: 1500ms;
    }
  }

  @keyframes flash {
    from {
      color: color(--color-highlight); 
    }

    to {
      color: white;
    }
  }

  @keyframes flyIn {
    from {
      left: -100%;
    }

    to {
      left: 0;
    }
  }
</style>