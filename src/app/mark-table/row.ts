import storage from 'src/storage';

const emptyRowList = new Array(21).fill(new Array(25).fill(null));

const availableCellRangeListMap: Map<number, number[][]> = new Map([
  [
    0,
    [
      [3, 8],
      [16, 21]
    ]
  ],
  [
    1,
    [
      [2, 9],
      [15, 22]
    ]
  ],
  [
    2,
    [
      [1, 10],
      [14, 23]
    ]
  ],
  [
    3,
    [
      [0, 11],
      [13, 24]
    ]
  ],
  [4, [[0, 24]]],
  [5, [[0, 24]]],
  [6, [[0, 24]]],
  [7, [[0, 24]]],
  [8, [[0, 24]]],
  [9, [[0, 24]]],
  [10, [[1, 23]]],
  [11, [[2, 22]]],
  [12, [[3, 21]]],
  [13, [[4, 20]]],
  [14, [[5, 19]]],
  [15, [[6, 18]]],
  [16, [[7, 17]]],
  [17, [[8, 16]]],
  [18, [[9, 15]]],
  [19, [[10, 14]]],
  [20, [[11, 13]]],
  [21, [[12, 12]]]
]);

const createRowList: () => Array<IMark[]> = () => {
  let money = 0;
  return emptyRowList.map((row, rIndex: number) => {
    return row.map((cell: null, cIndex: number) => {
      const availableCellRangeList = availableCellRangeListMap.get(rIndex);
      if (availableCellRangeList) {
        const availableCell = availableCellRangeList.find(
          availableCellRange =>
            availableCellRange[0] <= cIndex && cIndex <= availableCellRange[1]
        );
        const hasAvailableCell = Boolean(availableCell);

        if (hasAvailableCell) {
          money++;
          return {
            markId: `mark_${money}`,
            money
          };
        } else return null;
      } else return null;
    });
  });
};

export const initRowList: () => Promise<IMark[][]> = async () => {
  let markList = await storage.getAll();
  if (markList.length > 0) return getRowList();

  const rows = createRowList();
  rows.forEach(row => {
    row.forEach(mark => {
      mark && storage.addItem(mark);
    });
  });
  return rows;
};

export const getRowList: () => Promise<Array<IMark[]>> = async () => {
  const rows = createRowList();

  let markList = await storage.getAll();

  const getItemPromiseListList = rows.map((row: IMark[]) => {
    return row.map(async (cell: IMark) => {
      if (!cell) return null;

      return markList.find(mark => mark.markId === cell.markId);
    });
  });

  const getRowsPromise = getItemPromiseListList.reduce(
    async (accPromise, promiseList) => {
      const acc = await accPromise;
      const result = await Promise.all(promiseList);

      return [...acc, result];
    },
    Promise.resolve([])
  );

  return getRowsPromise;
};

export const getRecordList: () => Promise<IMark[]> = async () => {
  const markList = await storage.getAll();
  return markList.filter((mark: IMark) => mark.isMarked);
};
