<style lang="css" >
  .button {
    display: inline-block;
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 8px 16px;
    line-height: 1;
    cursor: pointer;
  }
  .button:hover {
    background-color: #ccc
  }
</style>

<template>
  <div class="button" on:click={onClick}>
    {label}
  </div>
</template>

<script lang="ts">
  import  'src/utils/types.d';
  import {noop} from  'src/utils/default';
  export let label: string = 'button';
  export let onClick: fn = noop;
</script>
