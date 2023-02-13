import { createApp } from 'vue';
import PopupComponent from './PopupComponent.vue';
import Tip from './views/TipView.vue';
import CollectionView from './views/CollectionView.vue';
import { setTab } from './tab';
import '../common.css';
import './style.css';

(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
    url: [
      'https://chat.openai.com/chat/*',
      'https://github.com/PlexPt/awesome-chatgpt-prompts-zh/*',
    ],
  });
  console.log(`[popup] `, tab);
  if (!tab) {
    createApp(Tip).mount('#app');
    return;
  }
  setTab(tab);
  if (tab.url?.includes('chat.openai.com/chat')) {
    createApp(PopupComponent).mount('#app');
    return;
  }

  if (tab.url?.includes('awesome-chatgpt-prompts')) {
    console.log(`Render 【CollectionView】`);
    createApp(CollectionView).mount('#app');
    return;
  }
})();
