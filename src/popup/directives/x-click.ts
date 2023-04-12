import { App, DirectiveBinding } from 'vue';

interface ClickDoubleElement extends HTMLElement {
  _clickDoubleTimer: ReturnType<typeof setTimeout> | null; // 计时器的类型为 setTimeout 返回值的类型，可以用来清除计时器
}

const DOUBLE_CLICK_INTERVAL = 250; // 点击事件和双击事件之间的时间间隔，单位毫秒
/**
 * 支持双击、单击
 */
const clickDoubleDirective = {
  mounted(el: ClickDoubleElement, binding: DirectiveBinding) {
    el._clickDoubleTimer = null;

    // 绑定单击事件和双击事件
    el.addEventListener('click', () => {
      if (!el._clickDoubleTimer) {
        // 如果计时器不存在，说明是单击事件，启动计时器
        el._clickDoubleTimer = setTimeout(() => {
          el._clickDoubleTimer = null;
          binding.value('click'); // 调用绑定的函数
        }, DOUBLE_CLICK_INTERVAL);
      } else {
        // 如果计时器已存在，说明是双击事件，清除计时器并调用绑定的函数
        clearTimeout(el._clickDoubleTimer);
        el._clickDoubleTimer = null;
        binding.value('db-click');
      }
    });
  },
};

export type ClickType = 'click' | 'db-click';

export default {
  install(app: App) {
    app.directive('click', clickDoubleDirective);
  },
};
