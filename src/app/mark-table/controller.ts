import dayjs from 'dayjs';
import storage from 'src/storage';
import { createRowList } from 'src/app/mark-table/utils';

export const getConfig = async (name: string) => {
  const configList = await storage.markConfig.getAll();
  return configList.find((config: IStorageData) => config.name === name) || {};
};

export const setConfig = async (data: IStorageData) => {
  return Object.keys(data)
    .map(key => [key, data[key]])
    .reduce(async (accPromise, keyValue) => {
      const acc = await accPromise;
      const addPromise = await storage.markConfig.updateItem({
        name: keyValue[0],
        value: keyValue[1]
      });
      return [...acc, addPromise];
    }, Promise.resolve([]));
};

export const initRowList: () => Promise<IMark[][]> = async () => {
  const { value: step } = await getConfig('step');
  const markList = await storage.mark365.getAll();
  if (markList.length > 0) return getRowList();

  const rows = createRowList(step);
  const promiseList: Promise<void>[] = [];
  rows.forEach(row => {
    row.forEach(mark => {
      mark && promiseList.push(storage.mark365.addItem(mark));
    });
  });
  await Promise.all(promiseList);
  return rows;
};

export const getRowList: () => Promise<IMark[][]> = async () => {
  const rows = createRowList();
  const markList = await storage.mark365.getAll();

  if (markList.length === 0) return Promise.resolve([]);

  const getItemPromiseListList = rows.map((row: IMark[]) => {
    return row.map(async (cell: IMark) => {
      if (!cell) return null;

      return markList.find((mark: IMark) => mark.markId === cell.markId);
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
  const markList = await storage.mark365.getAll();
  return markList.filter((mark: IMark) => mark.isMarked);
};

export const destroy = () => {
  return storage.mark365.clear();
};

export const handleMark = (cell: IMark) => {
  const date = dayjs().format('YYYY-MM-DD');
  const mark: IMark = {
    ...cell,
    isMarked: true,
    date
  };

  return storage.mark365.updateItem(mark);
};

export const autoMark = async (beginDate: string) => {
  const _beginDate = dayjs(beginDate);
  const date = dayjs();
  const diff = date.diff(beginDate, 'day');
  const dataList = await storage.mark365.getAll();
  const promiseList: Promise<void>[] = [];

  dataList.forEach((data: IMark, index: number) => {
    if (index <= diff) {
      const mark: IMark = {
        ...data,
        isMarked: true,
        date: _beginDate.add(index, 'day').format('YYYY-MM-DD')
      };
      promiseList.push(storage.mark365.updateItem(mark));
    }
  });
  return Promise.all(promiseList);
};
