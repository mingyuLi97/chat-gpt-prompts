let tab = {} as chrome.tabs.Tab;

export function getCurrentTab() {
  return tab;
}

export function setTab(t: chrome.tabs.Tab) {
  tab = t;
}
