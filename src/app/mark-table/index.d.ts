declare module 'src/app/mark-table/row.ts' {
  const initRowList: () => IMark[][];
  const getRowList: () => Promise<IMark[][]>;
  const getRecordList: () => Promise<IMark[]>;

  export { initRowList, getRowList, getRecordList };
}
