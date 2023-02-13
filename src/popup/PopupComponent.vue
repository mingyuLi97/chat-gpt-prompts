<template>
  <!-- <a :href="getExtensionUrl('src/options/index.html')" target="_blank">
    Open options page1111
  </a> -->
  <el-input
    v-model="search"
    class="w-50 m-2"
    placeholder="Please Input"
    :suffix-icon="Search"
  />
  <ul>
    <li class="add-group">
      <el-input
        v-model="textarea"
        :rows="1"
        autosize
        type="textarea"
        placeholder="添加一条新数据"
      />
      <el-button type="primary" @click="addItem">Add</el-button>
    </li>
    <li v-for="item in showArr" :key="item" class="content-item">
      <el-popover
        placement="top-start"
        :width="200"
        trigger="hover"
        :content="item"
      >
        <template #reference>
          <span class="text" @click="onClick(item)">{{ item }}</span>
        </template>
      </el-popover>

      <el-icon @click="remove(item)"><i-ep-circle-close /></el-icon>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { autoFill } from './tab';
import { throttle } from '../utils';
import { ref, computed, watch } from 'vue';
import { ContentStore } from './store';
// @ts-ignore
import fuzzysearch from 'fuzzysearch';

function getExtensionUrl(path: string) {
  return chrome.runtime.getURL(path);
}

const store = ContentStore;

const textarea = ref('');
const search = ref('');
const throttleKey = ref('');

const updateThrottleKey = throttle((v: string) => {
  throttleKey.value = v;
}, 500);

watch(search, function (newVal) {
  updateThrottleKey(newVal);
});

const showArr = computed(() => {
  return store.arr.filter(text => fuzzysearch(throttleKey.value, text));
});

function addItem() {
  if (textarea.value) {
    if (store.add(textarea.value)) {
      textarea.value = '';
    }
  }
}

function remove(item: string) {
  store.remove(item);
}

function onClick(item: string) {
  autoFill(item);
}
</script>

<style lang="scss" scoped>
@import '../common.css';
.add-group {
  display: flex;
}

.content-item {
  font-size: 16px;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 6px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 30px;

  .text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.content-item:hover {
  background-color: #f8f8f8;
}
</style>
