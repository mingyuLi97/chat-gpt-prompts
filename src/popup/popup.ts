import { createApp } from 'vue';
import './style.css';
import PopupComponent from './PopupComponent.vue';
import { setTab } from './tab';

(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
    url: 'https://chat.openai.com/chat/*',
  });
  if (!tab) return;
  setTab(tab);

  createApp(PopupComponent).mount('#app');
})();
