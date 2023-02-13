<template>
  <ul class="content-group" v-if="arr.length">
    <li v-for="item in arr" :key="item" class="content-item">
      <el-popover
        v-if="arr.length >= 10"
        placement="top-start"
        :width="300"
        trigger="hover"
        :content="item"
      >
        <template #reference>
          <span class="text limit" @click="emits('click-item', item)">{{
            item
          }}</span>
        </template>
      </el-popover>

      <span v-else class="text" @click="emits('click-item', item)">{{
        item
      }}</span>

      <el-icon @click="emits('delete-item', item)" class="del-icon"
        ><CircleClose
      /></el-icon>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CircleClose } from '@element-plus/icons-vue';
import { ElPopover, ElIcon } from 'element-plus';

defineProps<{ arr: string[] }>();
const emits = defineEmits<{
  (event: 'click-item', content: string): void;
  (event: 'delete-item', content: string): void;
}>();
</script>

<style lang="scss" scoped>
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
