### 目录结构

>通过语音转换的文本 记账

``` html
dateof_money
├── config.env    //配置文件
├── date_of_money //存放json文件夹
├── index.js      //nodejs主进程
├── lib //nodejs工具库
│   ├── getUserSend.js
│   ├── parseByAI.js
│   ├── parseByPy.js
│   └── readAndWrite.js
├── package-lock.json
├── package.json
├── readme.md
└── test.py     //解析文本钱数以及物品python脚本 使用spacy库
```

### 流程图原理
<img width="286" alt="image" src="https://github.com/cairongquan/date_of_money/assets/38879616/6a2ff6d9-8d25-4801-982d-f1c6f1790e86">
