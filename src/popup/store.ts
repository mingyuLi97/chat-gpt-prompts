import { reactive, watch, toRaw } from 'vue';

export const KEY = 'AUTO_FILL_LIST';

export const useLocalStore = () => {
  const arr = reactive<string[]>([]);

  chrome.storage.local.get(KEY).then(store => {
    arr.push(...new Set((store[KEY] as string[]) ?? []));
  });

  watch(arr, (newVal, oldVal) => {
    console.log(`[store] `, toRaw(newVal));
    chrome.storage.local.set({ [KEY]: toRaw(newVal) });
  });

  function add(v: string) {
    const idx = arr.findIndex(item => item === v);
    if (idx > -1) {
      return false;
    }
    arr.unshift(v);
    return true;
  }

  function remove(v: string) {
    const idx = arr.findIndex(item => item === v);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
  }

  function clear() {
    arr.splice(0, arr.length);
  }

  return { add, remove, clear, arr };
};
