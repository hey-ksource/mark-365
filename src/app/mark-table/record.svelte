<script lang="ts">
  export let recordList: IMark[] = [];
  $: list = recordList.sort((a, b) =>
    b.date > a.date ? 1 : b.date === a.date ? 0 : -1
  );
  $: total = recordList.reduce((acc, record) => {
    return acc + record.money;
  }, 0);
</script>

<div class="record-list">
  <div class="record-item total-item">
    <div class="record-label">总计</div>
    <div class="record-money">
      <span class="rmb-symbol">¥</span>
      {total}
    </div>
  </div>
  {#each list as record}
    <div class="record-item">
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

<style>
  .record-item + .record-item {
    margin-top: 15px;
  }
  .record-item {
    display: flex;
    background: #f9f4dc;
    padding: 10px 15px;
    border-radius: 4px;
    line-height: 1;
  }
  .record-label {
    width: 90px;
    text-align: right;
  }
  .record-money {
    margin-left: 20px;
    font-weight: 500;
  }
  .rmb-symbol {
    font-size: 12px;
    font-weight: normal;
  }
</style>
