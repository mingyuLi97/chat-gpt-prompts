import { createApp } from 'vue';
import PopupComponent from './PopupComponent.vue';
import Tip from './views/TipView.vue';
import CollectionView from './views/CollectionView.vue';
import { setTab } from './tab';
import {
  isAwesomeChatGPTPromptsZHPage,
  isChatGPTPage,
  URLPatterns,
} from '../constants';
import '../common.css';
import './style.css';

(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
    url: URLPatterns,
  });
  if (!tab) {
    createApp(Tip).mount('#app');
    return;
  }
  setTab(tab);
  if (isChatGPTPage(tab.url)) {
    createApp(PopupComponent).mount('#app');
    return;
  }
  if (isAwesomeChatGPTPromptsZHPage(tab.url)) {
    createApp(CollectionView).mount('#app');
    return;
  }
})();
