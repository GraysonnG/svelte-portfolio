<script>
  import { fly } from "svelte/transition";
  import { data } from "../content/projects";
  import { isMobile } from "../utils/mobilehelper";

  const mobile = isMobile();
</script>

<section class:mobile transition:fly={{ duration: 1000, x: -1000 }}>
  <ul>
    {#each data.projects as project, index}
      <li transition:fly={{ duration: 300, delay: 750 + index * 200, x: 50 }}>
        <a href={project.link} target="_blank">
          <img src={project.img} alt="" />
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        </a>
        <img class="glow" src={project.img} alt="" />
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }

  .mobile {
    overflow-x: auto;
  }

  ul {
    list-style: none;
    margin: 0;
    margin-top: 2em;
    padding: 0;
    display: flex;
    gap: 1em;
    flex-direction: row;
    margin-inline: 1em;
    margin-block: 3em;
    width: fit-content;
  }

  li {
    box-sizing: border-box;
    position: relative;
    height: 50vh;
    width: 21vh;
    min-width: 21vh;
    border-radius: 0.3em;
    transition: all 500ms;
    box-sizing: border-box;
  }

  li:hover {
    z-index: 2;
  }

  li:hover img {
    object-fit: cover;
    transform: scale(1.05);
  }

  li::after {
    content: "";
    width: 100%;
    height: 60%;
    background: linear-gradient(transparent, black);
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 0.3em;
  }

  li:last-child {
    margin-right: 1em;
  }

  img {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    transition: all 600ms;
  }

  .glow {
    z-index: -2;
    filter: blur(2em);
    border-radius: 0.3em;
    opacity: 0;
  }

  li:hover .glow {
    transform: scale(1);
    filter: blur(0.75em);
    opacity: 1;
  }

  div {
    position: absolute;
    padding: 0.5em;
    bottom: 0;
    font-size: max(1em, 11pt);
  }

  div * {
    text-align: center;
  }

  div p {
    font-size: 0.85em;
    margin-top: 1em;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    display: -webkit-box;
    overflow: hidden;
    color: rgb(255 255 255/0.7);
    transition: all 500ms;
  }

  li:hover div p {
    -webkit-line-clamp: 10;
  }

  a {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
    border-radius: 0.3em;
    overflow: hidden;
  }
</style>
