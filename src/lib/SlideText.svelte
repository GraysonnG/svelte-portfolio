<script>
  export let text = ""
</script>

<div>
  {#each text as character}
    <span>{character}</span>
  {/each}
</div>