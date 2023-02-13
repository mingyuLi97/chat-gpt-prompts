import { reactive, watch } from 'vue';
import Mock from './mock';

const KEY = 'AUTO_FILL_LIST';

const useLocalStore = () => {
  const arr = reactive<string[]>([]);
  const list = JSON.parse(localStorage.getItem(KEY) ?? '[]');
  arr.push(...[...new Set(Mock.concat(list))]);

  watch(arr, (newVal, oldVal) => {
    console.log(`[store] 写入数据`, newVal);
    localStorage.setItem(KEY, JSON.stringify(newVal));
  });

  function add(v: string) {
    const idx = arr.findIndex(item => item === v);
    if (idx > -1) {
      console.log(`[store] 已经存在了`);
      return false;
    }
    arr.push(v);
    return true;
  }

  function remove(v: string) {
    const idx = arr.findIndex(item => item === v);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
  }

  return { add, remove, arr };
};

export const ContentStore = useLocalStore();
