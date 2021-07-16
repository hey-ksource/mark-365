<script lang="ts">
  import CircularProgress from '@smui/circular-progress';
  import { fade } from 'svelte/transition';
  import Lrc from './lrc/index.svelte';
  let color: string;
  const setColor = (value: string) => {
    color = value;
  };
</script>

<div class="loading-container" transition:fade={{ duration: 300 }}>
  <CircularProgress
    class="loading"
    indeterminate
    style="--mdc-theme-primary: {color}"
  />
  <Lrc {setColor} />
</div>

<style>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  * :global(.loading) {
    height: 40px;
    width: 40px;
    margin-bottom: 20px;
  }
  * :global(.loading circle) {
    transition: stroke 2s;
  }
</style>
