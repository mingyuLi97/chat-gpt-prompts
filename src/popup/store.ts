const KEY = 'AUTO_FILL_LIST';

class Storage {
  arr: string[] = [];
  constructor() {
    const list = localStorage.getItem(KEY);
    if (list) {
      this.arr = JSON.parse(list);
    } else {
      this.arr = [
        '我想让你充当前端开发专家。我将提供一些关于Js、Node等前端代码问题的具体信息，而你的工作就是想出为我解决问题的策略。这可能包括建议代码、代码逻辑思路策略。我的第一个请求是“我需要能够动态监听某个元素节点距离当前电脑设备屏幕的左上角的X和Y轴，通过拖拽移动位置浏览器窗口和改变大小浏览器窗口。”',
        '我想让你充当英语翻译员、拼写纠正员和改进员。我会用任何语言与你交谈，你会检测语言，翻译它并用我的文本的更正和改进版本用英语回答。我希望你用更优美优雅的高级英语单词和句子替换我简化的 A0 级单词和句子。保持相同的意思，但使它们更文艺。我要你只回复更正、改进，不要写任何解释。我的第一句话是“istanbulu cok seviyom burada olmak cok guzel”',
      ];
    }
  }

  get() {
    return this.arr;
  }

  add(v: string) {
    this.arr.push(v);
    this.sync();
  }

  delete(v: string) {
    const idx = this.arr.findIndex(item => item === v);
    if (idx > -1) {
      this.arr.splice(idx, 1);
      this.sync();
    }
  }

  private sync() {
    localStorage.setItem(KEY, JSON.stringify(this.arr));
  }
}

export default new Storage();
