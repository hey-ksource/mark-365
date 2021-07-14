<script lang="ts">
  import { fly } from 'svelte/transition';
  import Button, { Label } from '@smui/button';
  import ProcessBar from './process-bar.svelte';
  import { getConfig } from 'src/app/mark-table/controller';
  export let recordList: IMark[] = [];
  export let destroy = () => {};

  let step = 1;

  $: list = recordList.sort((a, b) => {
    if (b.date > a.date) {
      return 1;
    } else {
      if (b.date === a.date) {
        return b.money > a.money ? 1 : -1;
      } else {
        return -1;
      }
    }
  });
  $: total = recordList.reduce(
    (acc, record) => Number((acc + record.money).toFixed(1)),
    0
  );
  $: target = ((step + step * 365) * 365) / 2;

  const init = async () => {
    const result = await getConfig('step');
    step = Number(result);
  };
  init();
</script>

<div class="record-list">
  <ProcessBar {total} {target} />
  {#each list as record, index}
    <div
      class="record-item"
      in:fly={{
        y: 50,
        duration: 30 * (list.length - index),
        delay: 30 * index
      }}
    >
      <div class="record-label">
        {record.date}
      </div>
      <div class="record-money">
        <span class="rmb-symbol">¥</span>
        {record.money}
      </div>
    </div>
  {/each}
  <div class="btn-block">
    <Button on:click={destroy}>
      <Label>删号重练</Label>
    </Button>
  </div>
</div>

<style>
  .record-item + .record-item {
    margin-top: 15px;
  }
  .record-item {
    display: flex;
    align-items: flex-end;
    background: #f9f4dc;
    padding: 10px 15px;
    border-radius: 4px;
    line-height: 1;
    color: rgb(var(--text-minor));
  }
  .record-label {
    width: 90px;
    text-align: right;
  }
  .record-money {
    display: flex;
    align-items: flex-end;
    margin-left: 20px;
    font-weight: bold;
    color: rgb(var(--text-primary));
  }
  .rmb-symbol {
    margin-right: 5px;
    font-size: 12px;
    font-weight: normal;
    color: rgb(var(--text-minor));
  }
  .btn-block {
    margin-top: 20px;
  }
  * :global(.btn-block button) {
    width: 100%;
  }
</style>
