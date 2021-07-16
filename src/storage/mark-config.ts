import crud from 'src/storage/crud';
import idb from 'src/storage/idb';

const storeName = 'mark-config';
const addItem = (data: IStorageData) => crud.addItem(storeName, data);
const getAll = () => crud.getAll(storeName);

const updateItem = async (data: IStorageData): Promise<Promise<void>> => {
  const primaryKey = await crud.getPrimaryKey(storeName, {
    name: data.name
  });

  return crud.updateItem(storeName, data, primaryKey);
};

async function clear() {
  const objectStore = await idb.getObjectStore(storeName);
  const request = objectStore.clear();

  return new Promise((resolve, reject) => {
    request.onerror = function (e: Event) {
      console.error('删除失败');
      reject(e);
    };

    request.onsuccess = function (e: Event) {
      resolve(e);
    };
  });
}
const mark = {
  addItem,
  getAll,
  updateItem,
  clear
};

export default mark;
