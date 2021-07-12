<script lang="ts">
  import { noop } from 'src/utils/default-value.ts';
  export let placeholder: string = '请输入';
  export let value: string = '';
  export let onChange = noop;

  const handleChange = (e: Event) => {
    // @ts-ignore
    onChange(e.target.value);
  };
</script>

<template>
  <input class="input" {placeholder} bind:value on:input={handleChange} />
</template>
