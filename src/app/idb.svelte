<script lang="ts">
  import Button from 'src/components/button';
  import Input from 'src/components/input';
  import storage from 'src/storage';
  let dataList: IMark[] = [];
  let id: string = '';
  let date: string = '';
  let desc: string = '';
  const getItem = async () => {
    var result = await storage.getItem({ markId: id });
    console.log(result);
  };

  const getAll = async () => {
    dataList = await storage.getAll();
  };

  const deleteItem = async () => {
    await storage.deleteItem(id);
    getAll();
  };

  const addItem = async () => {
    await storage.addItem({
      date,
      value: '123'
    });
    getAll();
  };

  const updateItem = async () => {
    await storage.updateItem({
      markId: id,
      money: 3233
    });
    getAll();
  };

  const onChangeId = (value: string) => {
    id = value;
  };
  const onChangeDate = (value: string) => {
    date = value;
  };

  const onChangeDesc = (value: string) => {
    desc = value;
  };

  getAll();
</script>

<template>
  <div>
    id: <Input value={id} onChange={onChangeId} />
  </div>
  <div>
    date: <Input value={date} onChange={onChangeDate} />
  </div>
  <div>
    desc: <Input value={desc} onChange={onChangeDesc} />
  </div>
  <div>
    <Button onClick={addItem}>新增</Button>
    <Button onClick={getItem}>查询</Button>
    <Button onClick={updateItem}>更新</Button>
    <Button onClick={deleteItem}>删除</Button>
    <Button onClick={getAll}>查询全部</Button>
  </div>

  <table>
    <thead>
      <tr>
        <th>markId</th>
        <th>money</th>
      </tr>
    </thead>
    <tbody>
      {#each dataList as data, i}
        <tr>
          <td>{data.markId}</td>
          <td>{data.money}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</template>
