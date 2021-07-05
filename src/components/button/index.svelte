<script lang="ts">
  import Button from 'src/components/button/view.svelte';
  import { handleClick } from 'src/components/button/controller.ts';
  export let onClick: fn = handleClick;
</script>

<Button {onClick}>
  <slot>按钮</slot>
</Button>
