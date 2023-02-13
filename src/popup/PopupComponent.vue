<template>
  <!-- <a :href="getExtensionUrl('src/options/index.html')" target="_blank">
    Open options page1111
  </a> -->
  <div>占位 🔍</div>
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
    <li v-for="item in store.arr" :key="item" class="content-item">
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
// import { ElButton } from 'element-plus';
import { autoFill } from './tab';
import { reactive, ref } from 'vue';
import { ContentStore } from './store';

function getExtensionUrl(path: string) {
  return chrome.runtime.getURL(path);
}

const store = ContentStore;

const textarea = ref('');

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
