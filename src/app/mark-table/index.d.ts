interface IStyle {
  [key: string]: string;
}
interface ILrc {
  style: IStyle;
  lrc: string;
}
interface IConfig {
  name: string;
  value: string | number;
}
declare module 'src/app/mark-table/controller' {
  const initRowList: () => IMark[][];
  const getRowList: () => Promise<IMark[][]>;
  const getRecordList: () => Promise<IMark[]>;
  const destroy: () => void;
  const handleMark: (cell: IMark) => Promise<void>;
  const setConfig: (data: IStorageData) => Promise<void>;
  const getConfig: (configName: string) => Promise<IConfig>;
  const autoMark: () => void;

  export {
    initRowList,
    getRowList,
    getRecordList,
    destroy,
    handleMark,
    setConfig,
    getConfig,
    autoMark
  };
}
declare module 'src/app/mark-table/config' {
  const availableCellRangeListMap: Map<number, number[][]>;

  export { availableCellRangeListMap };
}

declare module 'src/app/mark-table/utils' {
  const createRowList: (step?: number) => Array<IMark[]>;

  export { createRowList };
}
