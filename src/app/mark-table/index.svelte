<script lang="ts">
  import Guide from './components/guide/index.svelte';
  import TableRecord from './table-record.svelte';
  import Loading from 'src/components/loading.svelte';
  import Footer from 'src/app/footer';
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
  let showAutoMark = localStorage.getItem('beginDate');

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

  const onClickAutoMark = async () => {
    loading = true;
    await autoMark();
    await getData();
    loading = false;
  };

  getData();
</script>

{#if showAutoMark}<Button on:click={onClickAutoMark}>刷数据</Button>{/if}

<slot>
  <div class="mark-table-container">
    {#if loading}
      <Loading />
    {/if}
    {#if rowList.length === 0}
      <Guide onSelete={seleteStep} {onStart} />
    {:else}
      <TableRecord {rowList} {recordList} {getData} />
    {/if}
  </div>
  {#if rowList.length !== 0}
    <Footer />
  {/if}
</slot>

<style>
  .mark-table-container {
    display: flex;
    margin: 0 auto;
    height: 768px;
    width: 100%;
  }
</style>
