# eslint-plugin-import-alias

可以将相对路径导入和动态导入转化为路径别名的eslint插件

[English](README.md)

## 安装

```shell
npm install --save-dev @binbinji/eslint-plugin-import-alias

yarn add @binbinji/eslint-plugin-import-alias -D

pnpm add @binbinji/eslint-plugin-import-alias -D
```

## 示例

```javascript
import { test } from '@src/test' // valid
import { test } from './test' // invalid
import { test } from '../test' // invalid
import('./test') // invalid
```

## 配置

```javascript
module.exports = {
  plugins: ['@binbinji/import-alias'],
  rules: {
    '@binbinji/import-alias/import-alias': [
      'error',
      {
        aliases: [
          { alias: '@', matcher: '^src' }, // src/modules/app/test -> @/modules/app/test
        ],
      },
    ],
  },
}
```

可以配置别名来修复路径并重写为别名路径。每个别名都有别名文本和一个正则表达式匹配器，它将与来自 eslint 进程根目录（通常是项目根目录）的解析路径匹配。例如，如果解析的文件路径位于 `src` 文件夹（src/modules/app/test）中，则 `src`将被替换为 `@src`。

或者，您可以定义一个捕获组来仅替换捕获组中的部分，但仍与整个正则表达式匹配。

可以定义一个 `rootDir` 来解析文件路径。默认为 `process.cwd()`。在很多情况下，这在大多数情况下已经是项目根目录。

```javascript
module.exports = {
  plugins: ['@binbinji/import-alias'],
  rules: {
    '@binbinji/import-alias/import-alias': [
      'error',
      {
        rootDir: __dirname,
        aliases: [
          { alias: '@', matcher: '^src' }, // src/modules/app/test -> @/modules/app/test
        ],
      },
    ],
  },
}
```
