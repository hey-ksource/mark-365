<script lang="ts">
  import Dialog, { Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  export let onOk = () => {};
  export let onClose = () => {};
  export let open = false;
</script>

<Dialog bind:open on:MDCDialog:closed={onClose}>
  <Content>
    <slot />
  </Content>
  <Actions>
    <Button on:click={onClose}>
      <Label>取消</Label>
    </Button>
    <Button on:click={onOk} use={[InitialFocus]}>
      <Label>确定</Label>
    </Button>
  </Actions>
</Dialog>

<style>
</style>
