<script>
  import { addEntity } from "./gamestate";

  let text = '';
  let frames = 0;
  let prevTime = performance.now()

  addEntity((_, __) => {
    let time = performance.now()
    frames++;
    if (time >= prevTime + 1000) {
      const fps = ((frames * 1000) / (time - prevTime))
      text = `${fps.toFixed(1)} FPS`
      prevTime = time;
      frames = 0
    }
  })
</script>

<span>
  {text}
</span>