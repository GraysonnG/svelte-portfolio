<script>
  import { fly } from "svelte/transition";
  import { data } from "../content/projects";
</script>

<section transition:fly={{duration: 1000, x: -1000}}>
  <ul>
    {#each data.projects as project, index}
      <li transition:fly={{duration: 300, delay: 750 + (index * 200), x: -50}}>
        <img src={project.img} alt="" />
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank">Go</a>
        </div>
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
    height: 16vh;
    max-width: 60rem;
    aspect-ratio: 3/2;
    border: 1px solid transparent;
    transition: all 500ms;
    background-color: transparent;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
    border-radius: 0.5em;
    color: white;
    display: flex;
    gap: 1em;
    position: relative;
    padding: 0.33em;
  }

  div {
    overflow: hidden;
    font-size: max(1em, 1rem);
  }

  li > div > :global(div) {
    color: white;
  }

  p {
    width: 100%;
    display: inline-block;
    color: rgba(255, 255, 255, 0.7);
  }

  a {
    position: absolute;
    right: 0.5em;
    bottom: 0.5em;
    display: inline-block;
    background-color: var(--color-highlight);
    color: white;
    font-weight: 100;
    text-decoration: none;
    text-transform: uppercase;
    border-radius: 0.3rem;
    padding: 0.25em 1.5em;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);
    transition: transform 250ms;
  }

  a:hover {
    transform: scale(1.1);
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
    background-color: rgba(160, 150, 255, 0.1) !important;
  }

  li:hover > div > :global(div) {
    color: var(--color-highlight);
  }

  li:active {
    transform: scale(1.013);
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

    a {
      bottom: 0.25;
      right: 0.25;
    }

    li {
      height: unset;
      aspect-ratio: 6/1;
    }

    img {
      aspect-ratio: 9/16;
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