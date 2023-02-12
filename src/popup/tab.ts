let tab = {} as chrome.tabs.Tab;

export function getCurrentTab() {
  return tab;
}

export function setTab(t: chrome.tabs.Tab) {
  tab = t;
}

export function autoFill(content: string) {
  chrome.scripting.executeScript({
    target: { tabId: getCurrentTab().id as number },
    func: value => {
      const el = document.querySelector('textarea');
      if (el) {
        el.value = value;
      }
    },
    args: [content],
  });
}
