<script lang="ts">
  import Guide from 'src/app/mark-table/components/guide';
  import TableRecord from 'src/app/mark-table/table-record';
  import Loading from 'src/components/loading';
  import Footer from 'src/app/footer';
  import {
    autoMark,
    initRowList,
    getRowList,
    getRecordList,
    setConfig,
    getConfig
  } from 'src/app/mark-table/controller';
  import Button from '@smui/button';

  let rowList: Array<IMark[]> = [];
  let recordList: IMark[];
  let loading = true;
  let step = 1;
  let showAutoMark = Boolean(localStorage.getItem('beginDate'));

  const init = async () => {
    rowList = await initRowList();
    recordList = await getRecordList();
  };
  const getData = async () => {
    rowList = await getRowList();
    recordList = await getRecordList();
    const { value } = await getConfig('step');
    step = Number(value);
    loading = false;
  };
  const setStep = (value: number) => {
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
    showAutoMark = false;
    localStorage.setItem('beginDate', '');
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
      <Guide {setStep} {onStart} {step} />
    {:else}
      <TableRecord {rowList} {recordList} {getData} {setStep} {step} />
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
    width: 100%;
    aspect-ratio: 16 / 9;
  }
  @media (max-width: 1023px) {
    .mark-table-container {
      display: block;
    }
  }
</style>
