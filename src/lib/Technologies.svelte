<div>
  <i title="HTML 5" class="fa-brands fa-html5"></i>
  <i title="CSS 3" class="fa-brands fa-css3"></i>
  <i title="Javascript" class="fa-brands fa-js-square"></i>
  <i title="React" class="fa-brands fa-react"></i>
  <!-- <i title="Vue" class="fa-brands fa-vuejs"></i> -->
  <i title="Android" class="fa-brands fa-android"></i>
</div>

<style>
  div {
    font-size: 2em;
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  i::before {
    display: inline-block;
    transition: all 250ms;
    animation-name: zoomIn;
    animation-duration: 1s;
    animation-delay: 2s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    transform: scale(2);
    opacity: 0;
  }

  i:nth-child(2)::before {
    animation-delay: 2150ms;
  }

  i:nth-child(3)::before {
    animation-delay: 2300ms;
  }

  i:nth-child(4)::before {
    animation-delay: 2450ms;
  }

  i:nth-child(5)::before {
    animation-delay: 2600ms;
  }

  i:nth-child(6)::before {
    animation-delay: 2750ms;
  }

  i:nth-child(7)::before {
    animation-delay: 2900ms;
  }

  i:nth-child(8)::before {
    animation-delay: 3150ms;
  }

  i:hover::before {
    color: var(--color-highlight);
    scale: 1.5;
    text-shadow: 0 0 0.5em var(--color-highlight);
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(2);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>