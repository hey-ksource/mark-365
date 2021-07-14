declare module 'src/app/mark-table/controller' {
  const initRowList: () => IMark[][];
  const getRowList: () => Promise<IMark[][]>;
  const getRecordList: () => Promise<IMark[]>;
  const destroy: () => void;
  const handleMark: (cell: IMark) => Promise<void>;
  const setConfig: (data: IStorageData) => Promise<void>;
  const getConfig: (configName: string) => Promise<string | number>;
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
declare module 'src/app/mark-table/available-cell-config.ts' {
  const availableCellRangeListMap: Map<number, number[][]>;

  export default availableCellRangeListMap;
}

declare module 'src/app/mark-table/utils.ts' {
  const createRowList: (step?: number) => Array<IMark[]>;

  export { createRowList };
}
