<script lang="ts">
  import Table from 'src/app/mark-table/components/table';
  import { destroy, handleMark } from 'src/app/mark-table/controller';
  import Record from 'src/app/mark-table/components/record';
  import Dialog from 'src/components/dialog';
  import dayjs from 'dayjs';

  export let rowList: Array<IMark[]> = [];
  export let recordList: IMark[] = [];
  export let getData = () => {};
  export let step: number;
  export let setStep = (step: number) => {};

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

<div class="table-record-container">
  <div class="table-container">
    <Table {rowList} {onClickCell} />
  </div>

  <div class="record-list-container">
    <Record {recordList} {onDestory} {setStep} {step} />
  </div>
  <Dialog open={dialogOpen} {onOk} {onClose}>
    <div>{message}</div>
  </Dialog>
</div>

<style>
  .table-record-container {
    flex: 1;
    display: flex;
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

  @media (max-width: 1023px) {
    .table-record-container {
      flex-direction: column;
      width: 100%;
    }
    .record-list-container {
      margin-top: 20px;
      margin-left: 0;
    }
  }
</style>
