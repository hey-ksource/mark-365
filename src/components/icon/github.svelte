<script lang="ts">
  import { mdiGithub } from '@mdi/js';
  import Icon from 'src/components/icon';
  export let href = '';
  export let target = '';
</script>

<Icon path={mdiGithub} {href} {target} />
