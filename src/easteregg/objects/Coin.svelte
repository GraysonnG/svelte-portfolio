<script>
  import { addEntity } from "../gamestate";
  
  export let coin;
  let left = 0
  let top = 0

  addEntity((props) => {
    left = coin.x * props.map.tileSize
    top = coin.y * props.map.tileSize
  })
</script>

<div class="coin" style="
  left: {left}px;
  top: {top}px;
"><span></span></div>

<style>
  .coin {
    font-size: 1rem;
    display: flex;
    position: absolute;
    background-color: rgb(255, 255, 150, 0.7);
    aspect-ratio: 1;
    width: 1.5rem;
    color: black;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 900;
    animation: spin 1000ms linear infinite;
    transform: translate(-50%, -50%);
  }

  .coin span {
    display: block;
    width: 4px;
    height: 50%;
    border-radius: 2px;
    background-color: rgb(255, 255, 150, 0.7);
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotateY(0deg);
    }

    to {
      transform: translate(-50%, -50%) rotateY(180deg);
    }
  }
</style>