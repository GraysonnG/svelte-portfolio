<script>
  import { fly } from "svelte/transition";

  import SlideText from "../lib/SlideText.svelte";
  import Technologies from "../lib/Technologies.svelte";
  import { state } from "../stores/main";

</script>

<section transition:fly={{duration: 1000, x: 1000}} class:center={$state.loading}>
  <SlideText text={"Welcome To The <em>Portfolio</em> of"} size={"1.5em"} animate={!$state.loading} delay={550} />
  <h1>Grayson Gullion</h1>
  <SlideText text={"Platform Software Engineer & <em>Weeb</em>"} size={"1.5em"} animate={!$state.loading} delay={700} />
  <Technologies />
</section>

<style>
  section {
    position: absolute;
    left: 0;
    top: calc(50% - 12em);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    transition: all 1000ms;
    transform: translateX(0%);
  }

  h1 {
    position: relative;
    display: inline-block;
    line-height: 1;
    font-size: 6em;
    font-weight: 100;
    left: 0;
    top: -0.25rem;
    transform: translateX(0%);
    width: fit-content;
    transition: all 1000ms;
  }

  section > :global(div) {
    opacity: 1;
    transition: all 1000ms;
  }

  .center h1 {
    left: 50%;
    transform: translateX(-50%);
  }

  .center > :global(div) {
    opacity: 0;
  }

  @media screen and (max-width: 600px) {
    section {
      top: calc(50% - 12em);
      justify-content: center;
      align-items: center;
      max-width: 100%;
    }



    .center h1, h1 {
      left: 0;
      transform: translateX(0);
      text-align: center;
      font-size: 11vw;
    }
  }
</style>