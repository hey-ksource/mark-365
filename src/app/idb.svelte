<script lang="ts">
  import Button from 'src/components/button';
  import { add } from 'src/storage';
  const onClick: fn = () => {
    var request: IDBRequest = add({
      id: 1,
      name: '张三',
      age: 24,
      email: 'zhangsan@example.com'
    });

    request.onsuccess = function () {
      console.log('数据写入成功');
    };

    request.onerror = function () {
      console.log('数据写入失败');
    };
  };
</script>

<div>
  <Button {onClick}>插表</Button>
</div>
