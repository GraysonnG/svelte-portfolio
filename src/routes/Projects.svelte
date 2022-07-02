<script>
  import { fly } from "svelte/transition";
  import SlideText from "../lib/SlideText.svelte";
  import { data } from "../content/projects";

</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <h2>{data.title}</h2>
  <ul>
    {#each data.projects as project}
      <li>
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

  li::after {
    content: "";
    position: absolute;
    height: 25%;
    aspect-ratio: 1/1;
    right: 20%;
    top: 20%;
    border-right: 1px solid var(--color-highlight);
    border-top: 1px solid var(--color-highlight);
    transition: all 500ms;
    opacity: 0;
  }

  li::before {
    content: "";
    position: absolute;
    height: 25%;
    aspect-ratio: 1/1;
    left: 20%;
    bottom: 20%;
    border-left: 1px solid var(--color-highlight);
    border-bottom: 1px solid var(--color-highlight);
    transition: all 500ms;
    opacity: 0;
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
    top: -0.5em;
    right: -0.5em;
    opacity: 1;
  }

  li:hover::before {
    bottom: -0.5em;
    left: -0.5em;
    opacity: 1;
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
</style>