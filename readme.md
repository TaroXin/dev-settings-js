# Dev Settings JS

为 `DevSettings` Chrome 扩展开发的配套工具库，用于向插件上报调试信息，获取插件调试设置，变量设置

## 安装

```
npm install dev-settings-js
```

## 获取 `DevSettings` 变量

```ts
import DevSettings from 'dev-settings-js'

DevSettings.isDebugger // 是否是调试模式

// 获取变量设置的值
DevSettings.get('message')
// 获取变量设置的完整信息
DevSettings.getInfo('message')
```

## 上报信息

```ts
import DevSettings from 'dev-settings-js'

DevSettings.putLog('test message')
DevSettings.putLog('test message 2')

DevSettings.setLogHeader('============')
DevSettings.putLog('test message')
DevSettings.putLog('test message 2')
```