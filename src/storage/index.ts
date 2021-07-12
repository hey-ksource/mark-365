import crud from 'src/storage/crud';
import idb from 'src/storage/idb';

const addItem = crud.addItem;
const getItem = crud.getItem;
const init = idb.initIDB;
const getAll = crud.getAll;
const deleteItem = async (markId: string) => {
  const primaryKey = await crud.getPrimaryKey({ markId });
  return crud.deleteItem(primaryKey);
};

const updateItem = async (mark: IMark): Promise<void> => {
  const primaryKey = await crud.getPrimaryKey({ markId: mark.markId });
  const storageMark = Object.keys(mark)
    .filter(key => key !== 'id')
    .reduce((acc, key) => {
      acc[key] = mark[key];
      return acc;
    }, {});

  return crud.updateItem(storageMark, primaryKey);
};

const storage = { addItem, getItem, deleteItem, updateItem, getAll, init };
export default storage;
