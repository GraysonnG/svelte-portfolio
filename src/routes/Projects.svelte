<script>
  import { fly } from "svelte/transition";
  import infiniteSpire from "../assets/image.jpg";

</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <h2>My Projects</h2>

  <ul>
    <li>
      <img src="https://cataas.com/cat" alt="">
      <div>
        <h3>What Blank is Watching</h3>
        <p>A website that uses Anilist's GraphQL api to compile all the anime I have ever watched. Written using Svelte and Typescript this website is performant and beautiful.</p>
      </div>
    </li>
    <li>
      <img src={infiniteSpire} alt="">
      <div>
        <h3>Infinite Spire</h3>
        <p>This is an expansion mod for Slay the Spire that adds lots of new content: New Relics, Cards, Events, Bosses.</p>
      </div>
    </li>
    <li>
      <img src="https://cataas.com/cat" alt="">
      <div>
        <h3>3rd Project</h3>
      </div>
    </li>
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
    padding: 0;
    display: flex;
    gap: 1em;
    flex-direction: column;
  }

  li {
    position: relative;
    cursor: pointer;
    height: 14vh;
    max-width: 50em;
    aspect-ratio: 3/2;
    padding: 0.33em;
    border: 1px solid transparent;
    transition: all 500ms;
    display: flex;
    gap: 1em;
    background-color: rgba(255, 255, 255, 0.1);
  }

  div {
    overflow: hidden;
    font-size: max(0.75vw, 1rem)
  }

  h3 {
    color: white;
    font-size: 1.5em;
    transition: all 500ms;
  }

  p {
    display: inline-block;
    color: rgba(255, 255, 255, 0.6);
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
    transform: scale(1.1);
    background-color: rgba(160, 150, 255, 0.1);
  }

  li:hover h3 {
    color: var(--color-highlight);
  }


  li:hover::after {
    top: -0.25em;
    right: -0.25em;
    opacity: 1;
  }

  li:hover::before {
    bottom: -0.25em;
    left: -0.25em;
    opacity: 1;
  }

  img {
    position: relative;
    border-radius: 0.25em;
    overflow: hidden;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    z-index: 2;
    flex-shrink: 0;
  }

  @media screen and (max-width: 600px) {
    section {
      top: 10em;
      max-width: 100%;
      padding: 0 1em;
    }

    ul {
      margin-top: 2em;
    }

    li:hover {
      transform: scale(1.02);
    }
  }
</style>