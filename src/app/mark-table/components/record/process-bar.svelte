<script lang="ts">
  import { onMount } from 'svelte';
  export let target = 1;
  export let total = 0;

  const onResize = (node = document.body) => {
    const width = node.clientWidth;
    const processBar = node.querySelector('.process-bar');
    const bgBar = node.querySelector('.bg-bar');
    const mask = node.querySelector('.process-bar .mask');
    if (width < 1024) {
      processBar.style.width = `${width}px`;
      bgBar.style.width = `${width}px`;
      mask.style.width = `${width}px`;
    } else {
      processBar.style.width = `216px`;
      bgBar.style.width = `216px`;
      mask.style.width = `216px`;
    }
  };

  const resize = (node: HTMLElement) => {
    const _onResize = () => {
      onResize(node);
    };
    window.addEventListener('resize', _onResize);
    return {
      destroy() {
        window.removeEventListener('resize', _onResize);
      }
    };
  };

  onMount(() => {
    onResize();
  });
</script>

<div class="process-bar-container" use:resize>
  <div class="process-bar">
    <div class="bg-bar">
      <div class="total">{total}</div>
      <div class="divide">/</div>
      <div class="target">{target}</div>
    </div>
    <div class="total-bar" style="width: 50%">
      <!-- <div class="total-bar" style="width: {(100 * total) / target}%"> -->
      <div class="mask">
        <div class="total">{total}</div>
        <div class="divide">/</div>
        <div class="target">{target}</div>
      </div>
    </div>
  </div>
</div>

<style>
  .process-bar-container {
    margin-bottom: 15px;
    border-radius: 4px;
    overflow: hidden;
  }
  .process-bar {
    background: #f9f4dc;
    position: relative;
    width: 216px;
    height: 36px;
    color: #666;
  }
  .bg-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 216px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .total-bar {
    background-image: linear-gradient(
      45deg,
      rgba(var(--primary-color), 0.9) 10%,
      rgb(var(--primary-color)) 0,
      rgb(var(--primary-color)) 20%,
      rgba(var(--primary-color), 0.9) 0,
      rgba(var(--primary-color), 0.9) 30%,
      rgb(var(--primary-color)) 0,
      rgb(var(--primary-color)) 40%,
      rgba(var(--primary-color), 0.9) 0,
      rgba(var(--primary-color), 0.9) 50%,
      rgb(var(--primary-color)) 0,
      rgb(var(--primary-color)) 60%,
      rgba(var(--primary-color), 0.9) 0,
      rgba(var(--primary-color), 0.9) 70%,
      rgb(var(--primary-color)) 0,
      rgb(var(--primary-color)) 80%,
      rgba(var(--primary-color), 0.9) 0,
      rgba(var(--primary-color), 0.9) 90%,
      rgb(var(--primary-color)) 0
    );
    background-size: 108px 68px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    overflow: hidden;
    animation: fund-bg-move 5s linear infinite;
    transition: all 0.5s linear;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 216px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffda8e;
  }
  .total {
    flex: 1;
    text-align: right;
    color: rgb(var(--primary-color));
    font-weight: bold;
    font-size: 24px;
  }
  .target {
    flex: 1;
  }
  .divide {
    margin: 0 10px;
  }
  .mask .total {
    color: #fffc31;
  }
  @keyframes fund-bg-move {
    from {
      background-position-x: 0;
    }
    to {
      background-position-x: 108px;
    }
  }
</style>
