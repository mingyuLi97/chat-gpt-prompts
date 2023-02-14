<template>
  <!-- <a :href="getExtensionUrl('src/options/index.html')" target="_blank">
    Open options page1111
  </a> -->
  <div class="popup-container">
    <section class="top-bar">
      <div class="search-group">
        <el-input
          v-model="search"
          :style="{ '--el-input-border-radius': '999px' }"
          placeholder="请输入搜索关键字"
          :prefix-icon="Search"
        />
        <el-icon @click="showAdd = !showAdd" class="icon" title="设置"
          ><Operation
        /></el-icon>
      </div>

      <HandleResource
        :visible="showAdd"
        @add-item="addItem"
        @clear="clearStore"
      />
    </section>
    <div class="blank"></div>

    <ul class="content-group">
      <li v-for="item in showArr" :key="item" class="content-item">
        <el-popover
          v-if="showArr.length >= 10"
          placement="top-start"
          :width="300"
          trigger="hover"
          :content="item"
        >
          <template #reference>
            <span class="text limit" @click="onClick(item)">{{ item }}</span>
          </template>
        </el-popover>

        <span v-else class="text" @click="onClick(item)">{{ item }}</span>

        <el-icon @click="remove(item)" class="del-icon"
          ><CircleClose
        /></el-icon>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { Search, CircleClose, Operation } from '@element-plus/icons-vue';
import { ElInput, ElPopover, ElIcon } from 'element-plus';
import { autoFill } from './tab';
import { throttle } from '../utils';
import { ref, computed, watch } from 'vue';
import { useLocalStore } from './store';
// @ts-ignore
import fuzzysearch from 'fuzzysearch';
import HandleResource from './components/HandleResource.vue';

function getExtensionUrl(path: string) {
  return chrome.runtime.getURL(path);
}

const store = useLocalStore();
console.log(`[PopupComponent] `, store);

const search = ref('');
const throttleKey = ref('');
const showAdd = ref(false);

const updateThrottleKey = throttle((v: string) => {
  throttleKey.value = v;
}, 500);

watch(search, function (newVal) {
  updateThrottleKey(newVal);
});

const showArr = computed(() => {
  return store.arr.filter(text => fuzzysearch(throttleKey.value, text));
});

function addItem(content: string) {
  store.add(content);
  showAdd.value = false;
}

function remove(item: string) {
  store.remove(item);
}

function clearStore() {
  store.clear();
}

function onClick(item: string) {
  autoFill(item);
}
</script>

<style lang="scss" scoped>
.popup-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 600px;
}

.top-bar {
  .search-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    background-color: var(--el-color-primary);

    .icon {
      padding: 2px 3px 2px 10px;
      font-size: 23px;
      color: #fff;
      &:hover {
        color: aqua;
      }
    }
  }
}

.content-group {
  padding: 10px;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}

.content-item {
  box-sizing: border-box;
  font-size: 16px;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 6px;
  margin: 5px 0;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 30px;

  .text {
    flex: 1;
    &.limit {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.del-icon {
  display: none;
}

.content-item:hover {
  box-shadow: 2px 2px 2px rgb(0 0 0 / 10%);
  .del-icon {
    display: block;
  }
}
</style>
