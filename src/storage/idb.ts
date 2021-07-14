import { dbName, storeNameMap } from 'src/storage/config';

let db: IDBDatabase;

function initIDB(): Promise<IDBDatabase> {
  if (db) return Promise.resolve(db);
  const request: IDBOpenDBRequest = window.indexedDB.open(dbName, 1);

  let objectStore: IDBObjectStore;

  return new Promise((resolve, reject) => {
    request.onerror = function (e: Event) {
      console.error('数据库打开出错');
      reject(e);
    };

    request.onsuccess = function (e: Event) {
      // @ts-ignore
      db = e.target.result;
      resolve(db);
    };

    request.onupgradeneeded = function (e: Event) {
      // @ts-ignore
      db = e.target.result;

      if (!db.objectStoreNames.contains(storeNameMap.get('mark-365'))) {
        objectStore = db.createObjectStore(storeNameMap.get('mark-365'), {
          autoIncrement: true
        });
        objectStore.createIndex('markId', 'markId', { unique: true });
      }

      if (!db.objectStoreNames.contains(storeNameMap.get('mark-config'))) {
        objectStore = db.createObjectStore(storeNameMap.get('mark-config'), {
          autoIncrement: true
        });
        objectStore.createIndex('name', 'name', { unique: true });
      }
    };
  });
}

async function getObjectStore(name: string): Promise<IDBObjectStore> {
  const db: IDBDatabase = await initIDB();
  return db
    .transaction([storeNameMap.get(name)], 'readwrite')
    .objectStore(storeNameMap.get(name));
}

const idb = { initIDB, getObjectStore };
export default idb;
