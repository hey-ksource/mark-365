const dbName: string = 'mark-database';
const storeName: string = '365-mark';
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
      if (!db.objectStoreNames.contains(storeName)) {
        objectStore = db.createObjectStore(storeName, {
          autoIncrement: true
        });
        objectStore.createIndex('markId', 'markId', { unique: true });
      }
    };
  });
}

async function getObjectStore(): Promise<IDBObjectStore> {
  const db: IDBDatabase = await initIDB();
  return db.transaction([storeName], 'readwrite').objectStore(storeName);
}

const idb = { initIDB, getObjectStore };
export default idb;
