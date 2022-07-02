<script>
  import { fly } from "svelte/transition";
  import infiniteSpire from "../assets/infinite-spire.jpg";
  import wbiw from "../assets/wbiw-thumbnail.jpg";
import SlideText from "../lib/SlideText.svelte";

</script>

<section transition:fly={{duration:1000, x: -1000}}>
  <h2>My Projects</h2>

  <ul>
    <li style="--animation-delay: 2137ms;">
      <img src={wbiw} alt="">
      <div>
        <SlideText text="What Blank is Watching" size="1.5em" nocaps />
        <p>A website that uses Anilist's GraphQL api to compile all the anime I have ever watched. Written using Svelte and Typescript this website is performant and beautiful.</p>
      </div>
    </li>
    <li style="--animation-delay: 0ms;">
      <img src={infiniteSpire} alt="">
      <div>
        <SlideText text="Infinite Spire" size="1.5em" delay={500} nocaps />
        <p>This is an expansion mod for Slay the Spire that adds lots of new content: New Relics, Cards, Events, Bosses.</p>
      </div>
    </li>
    <li style="--animation-delay: 3379ms;">
      <img src="https://cataas.com/cat" alt="">
      <div>
        <SlideText text="Some Other Project" size="1.5em" delay={1000} nocaps />
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
    height: 12vh;
    max-width: 60rem;
    animation-name: pulse;
    animation-duration: 5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-delay: var(--animation-delay);
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
    font-size: 1rem;
  }

  li > div > :global(div) {
    color: white;
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
    transform: translateX(2.5em) scale(1.1);
    background-color: rgba(160, 150, 255, 0.2) !important;
  }

  li:hover > div > :global(div) {
    color: var(--color-highlight);
  }

  li:active {
    transform: translateX(1.2em) scale(1.05);
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
      padding: 0 1em;
      transform: translateY(-50%);
    }

    div {
      font-size: 1em;
    }

    ul {
      margin-top: 2em;
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
      background-color: rgba(255, 255, 255, 0.1);
    }

    to {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
</style>