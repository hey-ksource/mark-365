const request: IDBOpenDBRequest = window.indexedDB.open('test', 5);

request.onerror = function () {
  console.log('数据库打开出错');
};

let db: IDBDatabase;
request.onsuccess = function () {
  console.log('数据库打开成功');
  db = request.result;
};

request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
  // @ts-ignore
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { autoIncrement: true });
  }
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
  console.log('数据库更新', objectStore);
};

function add(person: IPerson): IDBRequest {
  return db
    .transaction(['person'], 'readwrite')
    .objectStore('person')
    .add(person);
}

export { add };
