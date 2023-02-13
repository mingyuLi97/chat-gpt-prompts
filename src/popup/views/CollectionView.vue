<template>
  <div class="wrapper">
    <el-button
      class="btn"
      type="primary"
      :disabled="state === 'loading'"
      @click="onClick"
      >{{ btnContent }}</el-button
    >
  </div>
  <ContentList :arr="arr" @delete-item="onDelete" />
</template>

<script setup lang="ts">
import { reactive, ref, computed, toRaw } from 'vue';
import { ElButton } from 'element-plus';
import ContentList from '../components/ContentList.vue';
import { getCurrentTab } from '../tab';
import { KEY } from '../store';

type State = 'waitCollect' | 'loading' | 'waitWrite' | 'success';

const arr = reactive<string[]>([]);

const state = ref<State>('waitCollect');

const btnContent = computed(() => {
  if (state.value === 'waitWrite') {
    return '一键导入';
  }
  if (state.value === 'loading') {
    return 'loading...';
  }
  if (state.value === 'success') {
    return '写入成功';
  }
  return '抓取';
});

function onClick() {
  if (state.value === 'waitCollect') collection();
  if (state.value === 'waitWrite') writeToStore();
}

function onDelete(v: string) {
  const idx = arr.findIndex(item => item === v);
  if (idx > -1) {
    arr.splice(idx, 1);
  }
}

async function collection() {
  state.value = 'loading';
  const res = await chrome.scripting.executeScript({
    target: { tabId: getCurrentTab().id as number },
    func: () => {
      const contents: HTMLElement[] = Array.from(
        document.querySelectorAll(
          '#readme > div.Box-body.px-5.pb-5 > article > blockquote > p'
        )
      );
      return contents.map(e => e.innerText);
    },
  });
  if (res && res[0] && res[0].result) {
    arr.push(...res[0].result);
  }
  if (arr.length) {
    state.value = 'waitWrite';
  }
}

async function writeToStore() {
  state.value = 'loading';
  try {
    const store = await chrome.storage.local.get(KEY);
    const oldList = (store[KEY] as string[]) ?? [];
    const list = [...new Set([...oldList, ...toRaw(arr)])];
    await chrome.storage.local.set({ [KEY]: list });
  } catch (error) {
    console.error('写入出错');
  } finally {
    state.value = 'success';
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .btn {
    width: 200px;
  }
}
</style>
