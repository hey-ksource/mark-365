declare interface IStorageData {
  [propertyName: string]: any;
}

declare interface IMark {
  markId?: string;
  date?: string;
  money: number;
  isMarked?: boolean;
}
declare module 'src/storage/config' {
  const dbName: string;
  const storeNameMap: Map<[string, string]>;

  export { dbName, storeNameMap };
}

declare module 'src/storage/idb' {
  const initIDB: () => Promise<IDBDatabase>;
  const getObjectStore: (stroeName: string) => IDBObjectStore;
  const idb = { initIDB, getObjectStore };
  export default idb;
}

declare module 'src/storage/crud' {
  const addItem: (stroeName: string, data: IStorageData) => Promise<void>;
  const deleteItem: (stroeName: string, primaryKey: number) => Promise<void>;
  const updateItem: (
    stroeName: string,
    data: IStorageData,
    primaryKey: number
  ) => Promise<void>;
  const getItem: (
    stroeName: string,
    partialData: IStorageData
  ) => Promise<Promise<IStorageData>>;
  const getAll: (stroeName: string) => Promise<IStorageData[]>;
  const getPrimaryKey: (
    stroeName: string,
    partialData: IStorageData
  ) => Promise<number>;
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

declare module 'src/storage/mark-365' {
  const addItem: (data: IStorageData) => Promise<void>;
  const deleteItem: (primaryKey: number) => Promise<void>;
  const updateItem: (
    data: IStorageData,
    primaryKey: number
  ) => Promise<Promise<void>>;
  const getItem: (partialData: IStorageData) => Promise<Promise<IStorageData>>;
  const getAll: () => Promise<IStorageData[]>;
  const clear: () => Promise<void>;
  const mark365 = {
    addItem,
    getItem,
    deleteItem,
    updateItem,
    getAll,
    clear
  };
  export default mark365;
}

declare module 'src/storage/mark-config' {
  const addItem: (data: IStorageData) => Promise<void>;
  const getAll: () => Promise<IStorageData[]>;
  const updateItem: (
    data: IStorageData,
    primaryKey: number
  ) => Promise<Promise<void>>;
  const clear: () => Promise<void>;
  const markConfig = {
    addItem,
    getAll,
    updateItem,
    clear
  };
  export default markConfig;
}

declare module 'src/storage' {
  interface mark365 {}
  interface markConfig {}

  const storage = {
    mark365,
    markConfig,
    init,
    clear
  };
  export default storage;
}

declare module 'assets/*' {
  const base64: string;
  export default base64;
}
