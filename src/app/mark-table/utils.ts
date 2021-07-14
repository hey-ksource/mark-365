import availableCellRangeListMap from 'src/app/mark-table/available-cell-config.ts';

const emptyRowList = new Array(21).fill(new Array(25).fill(null));

export const createRowList: (step?: number) => Array<IMark[]> = (step = 1) => {
  let money = 0;
  let index = 0;
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
          index++;
          money = Number((money + step).toFixed(1));
          return {
            markId: `mark_${index}`,
            money
          };
        } else return null;
      } else return null;
    });
  });
};
