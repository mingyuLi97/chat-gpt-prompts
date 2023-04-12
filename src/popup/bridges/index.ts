import { getCurrentTab } from '../tab';

/**
 * 自动填写到页面的输入框
 * @param content
 */
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

/**
 * 点击提交按钮
 */
export function clickSubmit() {
  chrome.scripting.executeScript({
    target: { tabId: getCurrentTab().id as number },
    func: () => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        let button = textarea.nextElementSibling as HTMLButtonElement;
        while (button && button.tagName.toUpperCase() !== 'BUTTON') {
          button = button.nextElementSibling as HTMLButtonElement;
        }
        if (button) {
          button.disabled = false;
          button.click();
        }
      }
    },
  });
}
