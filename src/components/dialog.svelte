<script lang="ts">
  import Dialog, { Content, Actions, InitialFocus, Title } from '@smui/dialog';
  import Button from '@smui/button';
  export let onOk = () => {};
  export let onClose = () => {};
  export let title = '';
  export let open = false;
</script>

<Dialog bind:open on:MDCDialog:closed={onClose}>
  {#if title}
    <Title class="dialog-title">
      {title}
    </Title>
  {/if}
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
