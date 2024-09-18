# 疑惑点

1. 渲染函数执行了，组件dom就一定会渲染吗？
```
function App() {

  return (
      <h1>Hello World</h1>
  );
}

```
如果App这个函数执行三次，`<App>`组件dom就一定会渲染三次吗？













# chatbond

- 开发环境地址：https://dev-bot.aecoapps.com/
- 测试环境地址：https://test-bot.aecoapps.com/
- 生产环境地址：https://www.chatbond.co/

本地开发连测试接口

1. 修改本地host 127.0.0.1 test-bot.aecoapps.com
2. 本地地址 http://test-bot.aecoapps.com/

## public

1. doc文档说明

- `doc/*` doc文档的协议，原版，内容更改后转成html的
- doc协议在线转成html：https://convertio.co/zh/

2. 脚本说明

- `iframeBefore.js` 客服网站里机器人分享时，生成script标签用的
- `wordPressBefore.js` wordPress制作的网页里，右下角直接加载机器人用的
- `wordPressSpecialBefore.js` wordPress相关代码，应后端要求添加的，他们自己使用
- 在线代码混淆地址：https://obfuscator.io/#code
