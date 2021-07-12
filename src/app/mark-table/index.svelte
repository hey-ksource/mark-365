<script lang="ts">
  import dayjs from 'dayjs';
  import storage from 'src/storage';
  import Table from './table.svelte';
  import {
    initRowList,
    getRowList,
    getRecordList
  } from 'src/app/mark-table/row.ts';
  import Record from './record.svelte';
  import Button from 'src/components/button';

  let rowList: Array<IMark[]> = [];
  let recordList: IMark[] = [];
  const initTable = async () => {
    rowList = await initRowList();
    recordList = await getRecordList();
  };
  const refresh = async () => {
    rowList = await getRowList();
    recordList = await getRecordList();
  };

  const handleMark = async (cell: IMark) => {
    if (cell.isMarked) return;
    const date = dayjs().format('YYYY-MM-DD');
    const message = `打卡: ${date} 存入 ${cell.money} 元`;

    if (window.confirm(message)) {
      const mark: IMark = {
        ...cell,
        isMarked: true,
        date
      };

      await storage.updateItem(mark);
      refresh();
    }
  };

  initTable();
</script>

<div class="content">
  <div class="mark-table-container">
    <div class="table-container">
      <Table {rowList} onClickCell={handleMark} />
    </div>
  </div>
  <div class="record-list-container">
    <Record {recordList} />
  </div>
</div>

<style>
  .content {
    display: flex;
    margin: 0 auto;
    padding: 20px;
    width: 1366px;
    height: 768px;
  }
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
    overflow: auto;
  }
</style>
