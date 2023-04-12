export const URLPatterns = [
  'https://chat.openai.com/chat*',
  'https://github.com/PlexPt/awesome-chatgpt-prompts-zh/*',
];

export function isChatGPTPage(url = '') {
  if (!url) return false;
  return url.includes('chat.openai.com/chat');
}

export function isAwesomeChatGPTPromptsZHPage(url = '') {
  if (!url) return false;
  return url.includes('PlexPt/awesome-chatgpt-prompts-zh');
}
