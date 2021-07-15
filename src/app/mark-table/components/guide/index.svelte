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
  let selectedStep: IObj = options[2];
  $: step = selectedStep.value;
  $: total = ((step + step * 365) * 365) / 2;

  const handleSelect = (segment: IObj) => {
    selectedStep = segment;
    onSelete(segment.value);
  };
</script>

<div class="guide-container">
  <div class="guide-item">每天多存</div>
  <div class="guide-item">
    <SegmentedButton
      segments={options}
      let:segment
      singleSelect
      selected={selectedStep}
    >
      <Segment
        {segment}
        on:click={() => handleSelect(segment)}
        title={segment.value}
      >
        <Label>{segment.label}</Label>
      </Segment>
    </SegmentedButton>
  </div>
  <div class="guide-item">365 天将有</div>
  <div class="guide-item total">
    ¥ {total}
  </div>
  <div class="guide-item">
    <Button variant="raised" on:click={onStart} style="width: 204px;">
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
    color: rgb(var(--text-minor));
  }
  .guide-item:first-child {
    margin-bottom: 10px;
  }
  .guide-item + .guide-item {
    margin-bottom: 30px;
  }
  .total {
    color: rgb(var(--primary-color));
    font-weight: bold;
    font-size: 32px;
  }
</style>
