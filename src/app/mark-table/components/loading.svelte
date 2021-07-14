<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import Loading from '@smui/circular-progress';
  let stage = 1;
  setTimeout(() => (stage = 2), 1900);
  setTimeout(() => (stage = 3), 3800);
  setTimeout(() => (stage = 4), 5700);
</script>

<div class="loading-container" transition:fade={{ duration: 300 }}>
  {#if stage === 1}
    <div
      class="loading-text"
      in:fly={{ y: 30, duration: 300 }}
      out:fly={{ y: -30, duration: 100 }}
    >
      正在进入跑道
    </div>
  {:else if stage === 2}
    <div
      class="loading-text"
      in:fly={{ y: 30, duration: 300, delay: 100 }}
      out:fly={{ y: -30, duration: 100 }}
    >
      正在调整姿态
    </div>
  {:else if stage === 3}
    <div
      class="loading-text"
      in:fly={{ y: 30, duration: 300, delay: 100 }}
      out:fly={{ y: -30, duration: 100 }}
    >
      开始滑行
    </div>
  {:else if stage === 4}
    <div
      class="loading-text"
      in:fly={{ y: 30, duration: 300, delay: 100 }}
      out:fly={{ y: -30, duration: 100 }}
    >
      起飞！
    </div>
  {/if}
  <Loading style="height: 40px; width: 40px; margin-top: 20px;" indeterminate />
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
  .loading-text {
    font-size: 18px;
    transition: all 0.5s;
  }
</style>
