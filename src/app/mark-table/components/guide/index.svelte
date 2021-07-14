<script lang="ts">
  import SegmentedButton, { Segment } from '@smui/segmented-button';
  import Button from '@smui/button';
  import { Label } from '@smui/common';

  export let onSelete = (value: number) => {};
  export let onStart = () => {};

  const options = [
    {
      label: '¥ 0.1',
      value: 0.1
    },
    {
      label: '¥ 0.5',
      value: 0.5
    },
    {
      label: '¥ 1',
      value: 1
    }
  ];
  let selectedStep = options[2];
  $: step = selectedStep.value;
  $: total = ((step + step * 365) * 365) / 2;
</script>

<div class="guide-container">
  <div class="guide-item">365 天，每天多</div>
  <div class="guide-item">
    <SegmentedButton
      segments={options}
      let:segment
      singleSelect
      selected={selectedStep}
    >
      <Segment
        {segment}
        on:click={() => onSelete(segment.value)}
        title={segment.value}
      >
        <Label>{segment.label}</Label>
      </Segment>
    </SegmentedButton>
  </div>
  <div class="guide-item">将有</div>
  <div class="guide-item total">
    ¥ {total}
  </div>
  <div class="guide-item">
    <Button variant="raised" on:click={onStart}>
      <Label>安排</Label>
    </Button>
  </div>
</div>

<style>
  .guide-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 18px;
    line-height: 1;
    --mdc-typography-button-font-size: 18px;
  }
  .guide-item {
    margin: 15px 0;
  }
  .total {
    color: rgb(var(--primary-color));
    font-weight: bold;
    font-size: 32px;
  }
</style>
