<script lang="ts">
  import { fly } from 'svelte/transition';
  import Button from '@smui/button';
  import ProcessBar from './process-bar.svelte';
  import { getConfig } from 'src/app/mark-table/controller';
  import Dialog from 'src/components/dialog.svelte';

  export let recordList: IMark[] = [];
  export let onDestory = () => {};
  export let setStep = (step: number) => {};
  export let step = 1;

  let dialogOpen = false;
  let message: string = null;
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
    const { value } = await getConfig('step');
    setStep(Number(value));
  };

  const onClickDestory = () => {
    message = '确定删号重练？';
    dialogOpen = true;
  };

  const onClose = () => {
    message = null;
    dialogOpen = false;
  };
  init();
</script>

<solt>
  <ProcessBar {total} {target} />
  <div class="record-list">
    {#each list as record, index}
      <div
        class="record-item"
        in:fly={{
          x: 100,
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
  </div>
  <div class="destory-btn">
    <Button on:click={onClickDestory}>删号重练</Button>
  </div>
  <Dialog open={dialogOpen} onOk={onDestory} {onClose}>
    <div>{message}</div>
  </Dialog>
</solt>

<style>
  .record-item {
    margin-bottom: 15px;
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
  * :global(.destory-btn button) {
    width: 100%;
  }

  @media (max-width: 1023px) {
    .record-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .record-item {
      flex: 0 0 180px;
    }
  }
</style>
