<template>
  <a href="javascript;" @click="onClick"
    ><el-icon><Link /></el-icon>{{ content || link }}
  </a>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Link } from '@element-plus/icons-vue';

const props = defineProps<{ link: string; content?: string }>();

function onClick() {
  window.open(props.link);
}
</script>

<style lang="scss" scoped>
a {
  margin: 0 4px;
  color: var(--el-color-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
}
</style>
