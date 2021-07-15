<script lang="ts">
  import { onDestroy } from 'svelte';
  import { lrcList, colorList } from './config';

  export let setColor = (color: string) => {};

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
        width: type === 'prev' ? '100%' : '0%'
      },
      lrc: randomGetLrc()
    };
  }

  let prev: ILrc = createLrc('prev');
  let next: ILrc = createLrc('next');
  setColor(prev.style['background-color']);
  let widthPercent = 0;

  let lrcTimer: any;
  let widthTimer: any;
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

  const createStyleCssText = (style: IStyle) => {
    return Object.keys(style).reduce((acc, key) => {
      return `${key}: ${style[key]};${acc}`;
    }, '');
  };

  function clearTimer() {
    clearInterval(lrcTimer);
    clearInterval(widthTimer);
    lrcTimer = null;
    widthTimer = null;
  }

  onDestroy(() => {
    clearTimer();
  });
</script>

<div class="lrc-bar">
  <div class="lrc prev" style={createStyleCssText(prev.style)}>
    <div class="mask">{prev.lrc}</div>
  </div>
  <div class="lrc next" style={createStyleCssText(next.style)}>
    <div class="mask">{next.lrc}</div>
  </div>
</div>

<style>
  .lrc-bar {
    position: relative;
    width: 350px;
    height: 36px;
    font-weight: bold;
    font-size: 16px;
    overflow: hidden;
    border-radius: 4px;
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
    width: 350px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
