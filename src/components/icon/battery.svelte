<script lang="ts">
  import { mdiBatteryChargingLow } from '@mdi/js';
  import Icon from 'src/components/icon';
  export let onClick = () => {};
</script>

<Icon path={mdiBatteryChargingLow} {onClick} className="battery-icon" />
