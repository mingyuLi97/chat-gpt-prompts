import { reactive, watch, toRaw } from 'vue';
import Mock from './mock';

const KEY = 'AUTO_FILL_LIST';

export const useLocalStore = () => {
  const arr = reactive<string[]>([]);

  chrome.storage.local.get(KEY).then(store => {
    console.log(`[store] `, store[KEY]);
    arr.push(...new Set((store[KEY] as string[]) ?? []));
  });

  watch(arr, (newVal, oldVal) => {
    chrome.storage.local.set({ [KEY]: toRaw(newVal) });
  });

  function add(v: string) {
    const idx = arr.findIndex(item => item === v);
    if (idx > -1) {
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
