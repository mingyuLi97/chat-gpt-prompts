<template>
  <div class="handle-resource" v-show="visible">
    <div class="operation-item add-item">
      <el-input
        v-model="textarea"
        :rows="1"
        autosize
        type="textarea"
        placeholder="添加一条新数据"
      />
      <el-button class="add" type="primary" @click="addItem">增加</el-button>
    </div>
    <el-button class="operation-item go-link">
      去
      <OpenLink
        link="https://github.com/PlexPt/awesome-chatgpt-prompts-zh#readme"
        content="ChatGPT 中文调教指南"
      />
      页面抓取
    </el-button>
    <el-button class="operation-item" type="danger" @click="$emit('clear')"
      >清除全部数据</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElIcon, ElButton } from 'element-plus';
import OpenLink from './OpenLink.vue';

defineProps<{ visible: boolean }>();
const emits = defineEmits<{
  (event: 'add-item', content: string): void;
  (event: 'clear'): void;
}>();

const textarea = ref('');

function addItem() {
  emits('add-item', textarea.value);
}
</script>

<style lang="scss" scoped>
.handle-resource {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
}

.operation-item {
  margin-top: 5px;
}

.add-item {
  width: 100%;
  display: flex;
  margin-top: 5px;
  .add {
    margin-left: 5px;
  }
}

.go-link {
  display: flex;
  justify-content: center;
}
</style>
