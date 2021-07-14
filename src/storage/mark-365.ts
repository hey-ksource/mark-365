import crud from 'src/storage/crud';
import idb from 'src/storage/idb';

const storeName = 'mark-365';
const addItem = (mark: IMark) => crud.addItem(storeName, mark);
const getItem = (partialMark: IStorageData) =>
  crud.getItem(storeName, partialMark);
const getAll = () => crud.getAll(storeName);

const deleteItem = async (markId: string) => {
  const primaryKey = await crud.getPrimaryKey(storeName, { markId });
  return crud.deleteItem(storeName, primaryKey);
};

const updateItem = async (mark: IMark): Promise<void> => {
  const primaryKey = await crud.getPrimaryKey(storeName, {
    markId: mark.markId
  });
  const storageMark = Object.keys(mark)
    .filter(key => key !== 'id')
    .reduce((acc, key) => {
      acc[key] = mark[key];
      return acc;
    }, {});

  return crud.updateItem(storeName, storageMark, primaryKey);
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
  getItem,
  deleteItem,
  updateItem,
  getAll,
  clear
};

export default mark;
