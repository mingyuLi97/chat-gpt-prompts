<template>
  <div class="tip-view">
    请在
    <a href="javascript;" @click="onClick"
      ><el-icon><Link /></el-icon>{{ link }}
    </a>
    下访问
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElIcon } from 'element-plus';
import { Link } from '@element-plus/icons-vue';

const link = ref('https://chat.openai.com/chat/');
function onClick() {
  window.open(link.value);
}
</script>

<style lang="scss" scoped>
.tip-view {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  a {
    margin: 0 4px;
    color: var(--el-color-primary);
    text-decoration: none;
    display: flex;
    align-items: center;
  }
}
</style>
