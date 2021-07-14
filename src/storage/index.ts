import mark365 from 'src/storage/mark-365';
import markConfig from 'src/storage/mark-config';
import idb from 'src/storage/idb';

const init = idb.initIDB;

async function clear() {
  mark365.clear();
  markConfig.clear();
}

const storage = {
  mark365,
  markConfig,
  init,
  clear
};
export default storage;
