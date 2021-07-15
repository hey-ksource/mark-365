<script lang="ts">
  import Table from './components/table/index.svelte';
  import { destroy, handleMark } from 'src/app/mark-table/controller';
  import Record from './components/record/index.svelte';
  import Dialog from 'src/components/dialog.svelte';
  import dayjs from 'dayjs';

  export let rowList: Array<IMark[]> = [];
  export let recordList: IMark[] = [];
  export let getData = () => {};
  let curCell: IMark = null;
  let dialogOpen = false;
  let message = '';

  const onClickCell = (cell: IMark) => {
    if (cell.isMarked) return;

    curCell = cell;
    message = `${date} 存 ¥ ${curCell?.money}`;
    dialogOpen = true;
  };

  const onDestory = async () => {
    await destroy();
    getData();
  };

  const onClose = () => {
    curCell = null;
    dialogOpen = false;
  };

  const onOk = async () => {
    await handleMark(curCell);
    getData();
  };
  const date = dayjs().format('YYYY-MM-DD');
</script>

<slot>
  <div class="mark-table-container">
    <div class="table-container">
      <Table {rowList} {onClickCell} />
    </div>
  </div>
  <div class="record-list-container">
    <Record {recordList} {onDestory} />
  </div>
  <Dialog open={dialogOpen} {onOk} {onClose}>
    <div>{message}</div>
  </Dialog>
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
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
