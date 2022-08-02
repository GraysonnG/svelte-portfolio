<div class="wrapper">
  <div class="square halftone"></div>
</div>

<style>
  .wrapper {
    position: fixed;
    inset: 0;
    z-index: -1;
  }

  .square {
    position: absolute;
    right: 15%;
    bottom: 15%;
    height: 10vw;
    aspect-ratio: 1;
    transform: rotate(35deg);
    animation: rotate 10s ease-in-out infinite alternate;
    /* background-color: red; */
  }

  .halftone::before {
    content: "";
    background-color: transparent;
    background-image: radial-gradient(rgba(255, 255, 255, 1) 7%, transparent 8.5%);
    background-size: 3vw 3vw;
    background-repeat: space;
    position: absolute;
    min-height: 100%;
    min-width: 100%;
    z-index: -1;
  }

  @keyframes rotate {
    from {
      transform: rotate(35deg) scale(1);
    }

    to {
      transform: rotate(195deg) scale(0.5);
    }
  }

  @media screen and (max-width: 600px) {
    .square {
      height: 8em;
    }
  }
</style>