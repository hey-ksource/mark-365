declare interface IStorageData {
  [propertyName: string]: any;
}

declare interface IMark {
  markId?: string;
  date?: string;
  money: number;
  isMarked?: boolean;
}

declare module 'src/storage/idb' {
  const initIDB: () => Promise<IDBDatabase>;
  const getObjectStore: () => IDBObjectStore;
  const idb = { initIDB, getObjectStore };
  export default idb;
}

declare module 'src/storage/crud' {
  const addItem: (data: IStorageData) => Promise<void>;
  const deleteItem: (primaryKey: number) => Promise<void>;
  const updateItem: (data: IStorageData, primaryKey: number) => Promise<void>;
  const getItem: (
    partialData: Partial<IStorageData>
  ) => Promise<Promise<IMark>>;
  const getAll: () => Promise<IStorageData[]>;
  const getPrimaryKey: (partialData: Partial<IStorageData>) => Promise<number>;
  const crud = {
    addItem,
    getItem,
    deleteItem,
    updateItem,
    getAll,
    getPrimaryKey
  };
  export default crud;
}

declare module 'src/storage' {
  const init: () => Promise<IDBDatabase>;
  const addItem: (mark: IStorageMark) => Promise<void>;
  const deleteItem: (id: string) => Promise<void>;
  const updateItem: (mark: IMark) => Promise<void>;
  const getItem: (partialMark: Partial<IMark>) => Promise<Promise<IMark>>;
  const getAll: () => Promise<IMark[]>;
  const storage = { addItem, getItem, deleteItem, updateItem, getAll, init };
  export default storage;
}
