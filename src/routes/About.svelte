<script>
  import { fly } from "svelte/transition";
  import { data } from "../content/about";
</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <img src={data.img} alt="">
  <div transition:fly={{delay: 750, duration:1000, x: -200}}>{@html data.content}</div>
</section>

<style>
  section {
    position: absolute;
    left: 0;
    top: calc(50% - 12em);
    transition: all 500ms;
    display: flex;
    align-items: center;
    gap: 6em;
    perspective: 1000px;
  }

  div {
    position: relative;
    font-size: max(1em, 1rem);
    max-width: 40em;
    transform: rotateY(-5deg)
  }

  div::before, div::after {
    content: "";
    position: absolute;
    background-color: var(--color-highlight);
    border-radius: 50%;
    pointer-events: none;
    aspect-ratio: 1;
    z-index: -1;
    box-shadow: 0 0 2em rgba(0,0,0,0.5);
  }

  div::after {
    bottom: -3em;
    right: -2em;
    width: 10rem;
    opacity: 0.3;
    animation: float 5s ease-in-out 1s infinite alternate;
  }

  div::before {
    bottom: -1em;
    right: 2em;
    width: 20rem;
    opacity: 0.2;
    animation: float 5s ease-in-out 3s infinite alternate;
  }

  img {
    display: block;
    animation-name: float;
    animation-duration: 5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    width: min(18rem, calc(100% - 1em));
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    box-shadow: 0 0 1em rgba(0,0,0,0.5);
    transform: translateY(0em);
    flex-shrink: 0;
  }

  div :global(h2) {
    color: var(--color-highlight)
  }

  @media screen and (max-width: 900px) {
    section {
      top: 50%;
      max-width: 100%;
      padding: 0 2em;
      transform: translateY(-50%);
      flex-direction: column;
      gap: 1em;
    }
  }

  @media screen and (max-width: 600px) {
    img {
      width: 15rem;
    }

    div::after {
      right: -0.25em;
    }
  }

  @keyframes float {
    from {
      transform: translateY(0em);
    }

    to {
      transform: translateY(2em);
    }
  }
</style>