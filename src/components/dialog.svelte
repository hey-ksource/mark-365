<script lang="ts">
  import Dialog, { Content, Actions, InitialFocus } from '@smui/dialog';
  import Button from '@smui/button';
  export let onOk = () => {};
  export let onClose = () => {};
  export let open = false;
</script>

<Dialog bind:open on:MDCDialog:closed={onClose}>
  <Content>
    <slot />
  </Content>
  <Actions>
    <Button on:click={onClose}>取消</Button>
    <Button on:click={onOk} use={[InitialFocus]}>确定</Button>
  </Actions>
</Dialog>

<style>
</style>
