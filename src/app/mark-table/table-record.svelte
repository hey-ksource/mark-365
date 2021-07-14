<script lang="ts">
  import Table from './components/table/index.svelte';
  import { destroy, handleMark } from 'src/app/mark-table/controller';
  import Record from './components/record/index.svelte';

  export let rowList: Array<IMark[]> = [];
  export let recordList: IMark[] = [];
  export let getData = () => {};

  const onClickCell = async (cell: IMark) => {
    await handleMark(cell);
    getData();
  };

  const resetTable = async () => {
    if (window.confirm('确定删号？')) {
      await destroy();
      getData();
    }
  };
</script>

<slot>
  <div class="mark-table-container">
    <div class="table-container">
      <Table {rowList} {onClickCell} />
    </div>
  </div>
  <div class="record-list-container">
    <Record {recordList} destroy={resetTable} />
  </div>
</slot>

<style>
  .mark-table-container {
    flex: 1;
  }
  .table-container {
    width: 100%;
    height: 100%;
  }
  .record-list-container {
    flex: 0 0 230px;
    margin-left: 20px;
    padding-right: 10px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
