<script lang="ts">
  import SegmentedButton, { Segment } from '@smui/segmented-button';
  import Button from '@smui/button';

  export let step = 1;
  export let setStep = (step: number) => {};
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
  $: selectedStep = options.find(o => o.value === step);
  $: total = ((step + step * 365) * 365) / 2;
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
        on:click={() => setStep(segment.value)}
        title={segment.value}
      >
        {segment.label}
      </Segment>
    </SegmentedButton>
  </div>
  <div class="guide-item">365 天将有</div>
  <div class="guide-item total">
    ¥ {total}
  </div>
  <div class="guide-item">
    <Button variant="raised" on:click={onStart} style="width: 204px;">
      安排
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
