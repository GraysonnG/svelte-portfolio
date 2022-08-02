<script>
  import { fly } from "svelte/transition";
  import SlideText from "../lib/SlideText.svelte";
  import { data } from "../content/projects";
</script>

<section transition:fly={{duration: 1000, x: -1000}}>
  <h2>{data.title}</h2>
  <ul>
    {#each data.projects as project, index}
      <li transition:fly={{duration: 300, delay: 750 + (index * 200), x: -50}}>
        <a href={project.link} target="_blank">
          <img src={project.img} alt="" />
          <div>
            <SlideText text={project.title} size="1.5em" />
            <p>{project.description}</p>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    position: absolute;
    left: 0;
    top: calc(50% - 20em);
    width: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    margin-top: 2em;
    padding: 0;
    display: flex;
    gap: 1em;
    flex-direction: column;
  }

  li {
    position: relative;
    cursor: pointer;
    height: 12vh;
    max-width: 60rem;
    animation-name: pulse;
    animation-duration: 5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-delay: var(--animation-delay);
    aspect-ratio: 3/2;
    border: 1px solid transparent;
    transition: all 500ms;
    background-color: transparent;
    border-radius: 0.5em;
  }

  div {
    overflow: hidden;
    font-size: 1rem;
  }

  li > a > div > :global(div) {
    color: white;
  }

  p {
    width: 100%;
    display: inline-block;
    color: rgba(255, 255, 255, 0.7);
  }

  a {
    color: white;
    text-decoration: none;
    display: flex;
    gap: 1em;
    position: relative;
    height: 12vh;
    padding: 0.33em;
  }

  li::after, li::before {
    content: "";
    position: absolute;
  }

  li::after {
    content: "";
    position: absolute;
    height: 25%;
    aspect-ratio: 1/1;
    border-right: 2px solid var(--color-highlight);
    border-top: 2px solid var(--color-highlight);
    transition: all 250ms;
    opacity: 0;

    top: calc(50%);
    transform: translateX(0) translateY(-50%) rotate(45deg) scale(.5);
    right: 50%;
  }

  li::before {
    content: "";
    position: absolute;
    height: 50%;
    aspect-ratio: 1/1;
    border-right: 2px solid transparent;
    border-bottom: 2px solid var(--color-highlight);
    transition: all 250ms;
    opacity: 0;

    transform-origin: bottom right;
    top: calc(50%);
    transform: translateX(0) translateY(calc(-100% + 1px)) scale(.5);
    right: 50%;
  }

  li:hover {
    transform: scale(1.025);
    background-color: rgba(160, 150, 255, 0.2) !important;
  }

  li:hover > a > div > :global(div) {
    color: var(--color-highlight);
  }

  li:active {
    transform: scale(1.013);
  }


  li:hover::after {
    animation: pointer-arrow 1s ease-in 0ms infinite forwards;
  }

  li:hover::before {
    animation: pointer-line 1s ease-in 0ms infinite forwards;
  }

  img {
    position: relative;
    border-radius: 0.3rem;
    overflow: hidden;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    z-index: 2;
    flex-shrink: 0;
  }

  @media screen and (max-width: 600px) {
    section {
      top: 50%;
      max-width: 100%;
      padding: 0 2em;
      transform: translateY(-50%);
    }

    div {
      font-size: 1em;
    }

    li:hover {
      transform: scale(1.02);
    }

    li:active {
      transform: scale(1.01);
    }
  }

  @keyframes pulse {
    from {
      background-color: transparent;
    }

    to {
      background-color: rgba(255, 255, 255, 0.025);
    }
  }

  @keyframes pointer-arrow {
    0% {
      opacity: 0;
      top: calc(50%);
      transform: translateX(0) translateY(-50%) rotate(45deg) scale(.5);
      right: 50%;
    }

    50%, 90% {
      top: calc(50%);
      transform: translateX(-1em) translateY(-50%) rotate(45deg) scale(1);
      right: 0;
      opacity: 1;
    }

    100% {
      top: calc(50%);
      transform: translateX(3em) translateY(-50%) rotate(45deg) scale(1);
      right: 0;
      opacity: 0;
    }
  }

  @keyframes pointer-line {
    0% {
      opacity: 0;
      top: calc(50%);
      transform: translateX(0) translateY(calc(-100% + 1px)) scale(.5);
      right: 50%;
    }

    50%, 90% {
      top: calc(50%);
      transform: translateX(calc(-1em + 0.5em - 3px)) translateY(calc(-100% + 1px)) scale(1);
      right: 0;
      opacity: 1;
    }

    100% {
      top: calc(50%);
      transform: translateX(calc(3em + 0.5em - 3px)) translateY(calc(-100% + 1px)) scale(1);
      right: 0;
      opacity: 0;
    }
  }
</style>