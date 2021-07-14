<script lang="ts">
  import Guide from './components/guide/index.svelte';
  import TableRecord from './table-record.svelte';
  import Loading from './components/loading.svelte';
  import {
    autoMark,
    initRowList,
    getRowList,
    getRecordList,
    setConfig
  } from 'src/app/mark-table/controller';
  import Button from '@smui/button';

  let rowList: Array<IMark[]> = [];
  let recordList: IMark[];
  let loading = true;
  let step = 1;
  let showAutoMark = false;

  const init = async () => {
    rowList = await initRowList();
    recordList = await getRecordList();
  };
  const getData = async () => {
    rowList = await getRowList();
    recordList = await getRecordList();
    loading = false;
  };
  const seleteStep = (value: number) => {
    step = value;
  };

  const onStart = async () => {
    loading = true;
    await setConfig({ step });
    await init();
    loading = false;
  };

  getData();
</script>

{#if showAutoMark}<Button on:click={autoMark}>补卡</Button>{/if}

<div class="content">
  {#if loading}
    <Loading />
  {/if}
  {#if rowList.length === 0}
    <Guide onSelete={seleteStep} {onStart} />
  {:else}
    <TableRecord {rowList} {recordList} {getData} />
  {/if}
</div>

<style>
  .content {
    display: flex;
    margin: 0 auto;
    padding: 20px;
    width: 1366px;
    height: 768px;
  }
</style>
