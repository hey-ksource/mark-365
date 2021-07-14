import idb from 'src/storage/idb';
import { storeNameMap } from 'src/storage/config';

async function addItem(storeName: string, data: IStorageData): Promise<void> {
  const objectStore = await idb.getObjectStore(storeNameMap.get(storeName));
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
  storeName: string,
  partialData: { [propertyName: string]: string | number }
): Promise<number> {
  const key = Object.keys(partialData)[0];
  const objectStore = await idb.getObjectStore(storeNameMap.get(storeName));
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
  storeName: string,
  partialData: { [propertyName: string]: string | number }
): Promise<IStorageData> {
  const primaryKey = await getPrimaryKey(storeName, partialData);
  const objectStore = await idb.getObjectStore(storeNameMap.get(storeName));
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

async function deleteItem(
  storeName: string,
  primaryKey: number
): Promise<void> {
  const objectStore = await idb.getObjectStore(storeNameMap.get(storeName));
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
  storeName: string,
  data: { [propertyName: string]: string | number },
  primaryKey: number
): Promise<void> {
  const objectStore = await idb.getObjectStore(storeNameMap.get(storeName));
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

async function getAll(storeName: string): Promise<IStorageData[]> {
  const objectStore = await idb.getObjectStore(storeNameMap.get(storeName));
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
