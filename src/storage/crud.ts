import idb from 'src/storage/idb';

async function addItem(data: IStorageData): Promise<void> {
  const objectStore = await idb.getObjectStore();
  const request = objectStore.add(data);

  return new Promise((resolve, reject) => {
    request.onerror = function (e: Event) {
      console.error('写入失败');
      reject(e);
    };

    request.onsuccess = function () {
      resolve();
    };
  });
}

async function getPrimaryKey(
  partialData: Partial<IStorageData>
): Promise<number> {
  const key = Object.keys(partialData)[0];
  const objectStore = await idb.getObjectStore();
  const index = objectStore.index(key);
  const keyRequest = index.getKey(partialData[key]);
  return new Promise((resolve, reject) => {
    keyRequest.onerror = function (e: Event) {
      console.error('keyRequest 失败');
      reject(e);
    };

    keyRequest.onsuccess = function (e: Event) {
      // @ts-ignore
      resolve(e.target.result);
    };
  });
}

async function getItem(
  partialData: Partial<IStorageData>
): Promise<IStorageData> {
  const primaryKey = await getPrimaryKey(partialData);
  const objectStore = await idb.getObjectStore();
  const request = objectStore.get(primaryKey);

  return new Promise((resolve, reject) => {
    request.onerror = function (e: Event) {
      console.error('查询失败');
      reject(e);
    };

    request.onsuccess = function (e: Event) {
      // @ts-ignore
      resolve(e.target.result);
    };
  });
}

async function deleteItem(primaryKey: number): Promise<void> {
  const objectStore = await idb.getObjectStore();
  const request = objectStore.delete(primaryKey);

  return new Promise((resolve, reject) => {
    request.onerror = function (e: Event) {
      console.error('删除失败');
      reject(e);
    };

    request.onsuccess = function () {
      resolve();
    };
  });
}

async function updateItem(
  data: IStorageData,
  primaryKey: number
): Promise<void> {
  const objectStore = await idb.getObjectStore();
  const request = objectStore.put(data, primaryKey);

  return new Promise((resolve, reject) => {
    request.onerror = function (e) {
      console.error('更新失败');
      reject(e);
    };

    request.onsuccess = function () {
      resolve();
    };
  });
}

async function getAll(): Promise<IStorageData[]> {
  const objectStore = await idb.getObjectStore();
  const request = objectStore.openCursor();
  const result: IStorageData[] = [];

  return new Promise((resolve, reject) => {
    request.onerror = function (e: Event) {
      console.error('查询失败');
      reject(e);
    };

    request.onsuccess = function (e: Event) {
      // @ts-ignore
      var cursor = e.target.result;

      if (cursor) {
        result.push(cursor.value);
        cursor.continue();
      } else {
        resolve(result);
      }
    };
  });
}

const crud = {
  addItem,
  getItem,
  deleteItem,
  updateItem,
  getAll,
  getPrimaryKey
};
export default crud;
