<template>
  <!-- <a :href="getExtensionUrl('src/options/index.html')" target="_blank">
    Open options page1111
  </a> -->
  <div>占位 🔍</div>
  <ul>
    <li
      v-for="(item, index) in arr"
      :key="index"
      class="content-item"
      @click="onClick(item)"
    >
      {{ item }}
    </li>
  </ul>
  <!-- <el-button type="primary">Primary</el-button> -->
</template>
<script setup lang="ts">
// import { ElButton } from 'element-plus';
import { autoFill } from './tab';
import { reactive } from 'vue';
import Store from './store';

function getExtensionUrl(path: string) {
  return chrome.runtime.getURL(path);
}

const arr = reactive<string[]>([]);

arr.push(...Store.get());

function onClick(item: (typeof arr)[0]) {
  autoFill(item);
}
</script>

<style scoped>
@import '../common.css';
</style>
