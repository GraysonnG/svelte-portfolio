<script>
  import { gamestate, player } from "../gamestate"
</script>

<div class="player" style="--player-size: {$player.size}px;">

</div>

<style>
  .player {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--player-size);
    height: var(--player-size);
    transform: translate(-50%, -50%);
    background-color: var(--color-highlight);
  }
</style>