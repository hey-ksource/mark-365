<script lang="ts">
  import { noop } from 'src/utils/default-value.ts';
  export let onClick = noop;
</script>

<template>
  <div class="button" on:click={onClick}>
    <slot>按钮</slot>
  </div>
</template>

<style lang="css">
  .button {
    display: inline-block;
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 8px 16px;
    line-height: 1;
    cursor: pointer;
  }
  .button:hover {
    background-color: #ccc;
  }
</style>
