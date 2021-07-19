<script lang="ts">
  import IconButton, { Icon } from '@smui/icon-button';
  import Svg from '@smui/common/Svg';
  export let path = '';
  export let href: string = null;
  export let target = '';
  export let onClick = () => {};
  export let className = '';
</script>

<IconButton {href} {target} {onClick} class={className}>
  <Icon component={Svg} viewBox="0 0 24 24" class="material-icons">
    <path fill="currentColor" d={path} />
  </Icon>
</IconButton>

<style>
  @import './style.css';
</style>
