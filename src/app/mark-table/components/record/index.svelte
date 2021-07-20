<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import Button from '@smui/button';
  import ProcessBar from 'src/app/mark-table/components/record/process-bar';
  import { getConfig } from 'src/app/mark-table/controller';
  import Dialog from 'src/components/dialog';
  import DatePicker from 'src/components/date-picker';
  import { autoMark } from 'src/app/mark-table/controller';
  import { noop } from 'src/utils/default-value';

  export let recordList: IMark[] = [];
  export let onDestory = () => {};
  export let setStep = (step: number) => {};
  export let step = 1;
  export let getData: INoop = noop;
  export let startLoading: INoop = noop;
  export let finishLoading: INoop = noop;

  let destoryDialogOpen = false;
  let autoMarkDialogOpen = false;

  let destoryMessage: string = null;
  let autoMarkBeginDate: string = null;

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
    destoryMessage = '确定删号重练？';
    destoryDialogOpen = true;
  };

  const onCloseDestoryDialog = () => {
    destoryMessage = null;
    destoryDialogOpen = false;
  };

  const onClickAutoMark = () => {
    autoMarkDialogOpen = true;
  };

  const onCloseAutoMark = () => {
    autoMarkBeginDate = null;
    autoMarkDialogOpen = false;
  };

  const onOkAutoMark = async () => {
    if (!autoMarkBeginDate) return;
    startLoading();
    await autoMark(autoMarkBeginDate);
    await getData();
    finishLoading();
    onCloseAutoMark();
  };

  const onChangeDate = (value: string) => {
    autoMarkBeginDate = value;
  };

  onMount(() => {
    init();
  });
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
  <div class="block-btn">
    <Button on:click={onClickAutoMark}>君子协议</Button>
  </div>
  <div class="block-btn">
    <Button on:click={onClickDestory}>删号重练</Button>
  </div>
  <Dialog
    open={destoryDialogOpen}
    onOk={onDestory}
    onClose={onCloseDestoryDialog}
  >
    <div>{destoryMessage}</div>
  </Dialog>
  <Dialog
    open={autoMarkDialogOpen}
    onOk={onOkAutoMark}
    onClose={onCloseAutoMark}
    title="从哪天开始补卡"
  >
    <DatePicker onChange={onChangeDate} value={autoMarkBeginDate} />
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
  .block-btn {
    margin-bottom: 15px;
  }
  * :global(.block-btn button) {
    width: 100%;
  }

  @media (max-width: 1023px) {
    .record-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>
