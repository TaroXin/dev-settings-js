# Dev Settings JS

为 `DevSettings` Chrome 扩展开发的配套工具库，用于向插件上报调试信息，获取插件调试设置，变量设置

## 安装

```
npm install dev-settings-js
```

## 获取 `DevSettings` 变量

```ts
import DevSettings from 'dev-settings-js'

// 获取系统变量
DevSettings.vars.isDebug

// 设置变量 与 获取变量
const message = DevSettings.need('message', {
  label: '测试消息',
  initialValue: '没有设置',
  // 文本框
  component: 'text',
})
// 如果没有在插件中设置值的话，就为初始值，否则为设置号的值
console.log(message) // 没有设置
```

## 上报信息

```ts
import DevSettings from 'dev-settings-js'

const logger = DevSettings.Logger.getInstance('LOGGER HEADER')

logger.push('test message')

// 块级上报
logger.startTrans('ROUND')
logger.push(1)
logger.push(2)
logger.push(3)
logger.endTrans()
```