<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { lrcList, colorList } from './config';

  export let setColor = (color: string) => {};

  let prev: ILrc = null;
  let next: ILrc = null;
  let widthPercent = 0;
  let lrcTimer: any;
  let widthTimer: any;

  function randomGetLrc() {
    const index = Math.floor(Math.random() * lrcList.length);
    return lrcList[index];
  }

  function randomGetColor() {
    const index = Math.floor(Math.random() * colorList.length);
    return colorList[index];
  }

  function createLrc(type: string): ILrc {
    return {
      style: {
        ...randomGetColor(),
        width: type === 'prev' ? '340px' : '0px'
      },
      lrc: randomGetLrc()
    };
  }

  setTimeout(() => {
    setColor(next.style['background-color']);
    lrcTimer = setInterval(() => {
      prev = next;
      next = createLrc('next');
      widthPercent = 0;
      setColor(next.style['background-color']);
    }, 4000);

    widthTimer = setInterval(() => {
      widthPercent += 0.8;
      next.style.width = `${widthPercent}%`;
    }, 20);
  }, 2000);

  function createStyleCssText(style: IStyle) {
    return Object.keys(style).reduce((acc, key) => {
      return `${key}: ${style[key]};${acc}`;
    }, '');
  }

  function clearTimer() {
    clearInterval(lrcTimer);
    clearInterval(widthTimer);
    lrcTimer = null;
    widthTimer = null;
  }

  function init() {
    prev = createLrc('prev');
    next = createLrc('next');
    setColor(prev.style['background-color']);
  }

  onMount(() => {
    init();
  });

  onDestroy(() => {
    clearTimer();
  });
</script>

<div class="lrc-bar">
  {#if prev}
    <div class="lrc prev" style={createStyleCssText(prev.style)}>
      <div class="mask">{prev.lrc}</div>
    </div>
  {/if}
  {#if next}
    <div class="lrc next" style={createStyleCssText(next.style)}>
      <div class="mask">{next.lrc}</div>
    </div>
  {/if}
</div>

<style>
  .lrc-bar {
    position: relative;
    width: 340px;
    height: 32px;
    font-weight: bold;
    overflow: hidden;
    border-radius: 4px;
    user-select: none;
  }
  .lrc {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
  }
  .lrc.next {
    z-index: 1;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 340px;
    height: 100%;
    line-height: 1;
  }
</style>
