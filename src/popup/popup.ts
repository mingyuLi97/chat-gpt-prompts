import { createApp } from 'vue';
import PopupComponent from './PopupComponent.vue';
import Tip from './TipView.vue';
import { setTab } from './tab';
import '../common.css';
import './style.css';

(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
    url: 'https://chat.openai.com/chat/*',
  });
  if (tab) {
    setTab(tab);
    createApp(PopupComponent).mount('#app');
  } else {
    createApp(Tip).mount('#app');
  }
})();
