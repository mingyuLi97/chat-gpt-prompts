import { isAwesomeChatGPTPromptsZHPage, isChatGPTPage } from './constants';

chrome.tabs.onActivated.addListener(({ tabId }) => {
  updateBadgeText(tabId);
});
chrome.tabs.onReplaced.addListener((addedTabId: number) => {
  updateBadgeText(addedTabId);
});

chrome.tabs.onUpdated.addListener(async (id, info) => {
  if (info.status === 'complete') {
    updateBadgeText(id);
  }
});

async function updateBadgeText(tabId: number) {
  const tab = await chrome.tabs.get(tabId);
  const url = tab.url;
  if (isChatGPTPage(url) || isAwesomeChatGPTPromptsZHPage(url)) {
    chrome.action.setBadgeText({
      text: 'on',
    });
  } else {
    chrome.action.setBadgeText({
      text: 'off',
    });
  }
}
