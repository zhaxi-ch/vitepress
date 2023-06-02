### 注意点(viteprss 和 vuepress  的变化点)
    调试的端口和主机名
     vitepress 修改启动端口需要通过命令行传参 --port=8732   --host  192.168.x.x
```
在package.json中增加如何的内容，这样可以远程调试
  "scripts": {
    "docs:dev": "vitepress dev docs  --host 192.168.100.100 --port=8001 ",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
```
    public 公共文件
     vuepress 是 docs/.vuepress/public 目录
     vitepress 是 docs/public 目录
    路由
       vuepress 默认配置下 README.md 和 index.md 都会被转换成 index.html
       vitepress 默认配置下只有 index.md 会被转换成 index.html
       vuepress 使用的是 navbar，需要修改为 nav
       vuepress 使用的是 children，需要修改为 items，且 items 是一个对象数组
       vuepress sidebar 的展开使用的是 collapsible，需要修改为 collapsed
    导入代码块
       vuepress 语法为 @[code](./code/snippet.js)
       vitepress 语法为 <<< @/code/snippet.js部分导入使用 VS Code region 语法，不再支持按行号引入
# ES6 常用知识

`ECMAScript 6` (简称 `ES6`) 是 `JavaScript` 语言的下一代标准

`ECMAScript` 的提案流程

- `Stage 0 - Strawman`（展示阶段）
- `Stage 1 - Proposal`（征求意见阶段）
- `Stage 2 - Draft`（草案阶段）
- `Stage 3 - Candidate`（候选人阶段）
- `Stage 4 - Finished`（定案阶段）

一个提案只要能进入 `Stage 2` 就差不多肯定会包括在以后的正式标准里面
::: warning ES6 和 ES2015 的区别
`ES2015` 是一个年份标记，表示当年发布的 `ECMAScript` 标准的正式版本，其全称为《`ECMAScript 2015` 标准》（简称 `ES2015`）<br>
`ES6` 是一个历史名词也是一个泛指，含义是 `5.1` 版以后的 `JavaScript` 的下一代标准，涵盖了 `ES2015、ES2016、ES2017 ES2018` 等等
:::