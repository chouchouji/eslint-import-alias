# eslint-plugin-import-alias

An ESLint rule for forcing import and dynamic import path aliases.

[中文](README.zh-CN.md)

## Install

```shell
npm install --save-dev @binbinji/eslint-plugin-import-alias

yarn add @binbinji/eslint-plugin-import-alias -D

pnpm add @binbinji/eslint-plugin-import-alias -D
```

## Example

```javascript
import { test } from '@src/test' // valid
import { test } from './test' // invalid
import { test } from '../test' // invalid
import('./test') // invalid
```

## Configure

```javascript
{
  plugins: ['@binbinji/import-alias'],
  rules: {
    "@binbinji/import-alias/import-alias": [
      "error",
      {
        "aliases": [
          { "alias": "@", "matcher": "^src" }, // src/modules/app/test -> @/modules/app/test
        ]
      }
    ]
  }
}
```

Aliases can be configured to fix the path and rewrite to an aliased path. Each alias has the alias text and a regex matcher that will match against the resolved path from the root directory of the eslint process (usually the project root). For example, if the resolved file path is in the 'src' folder (src/modules/app/test) then 'src' will be replaced with '@src'.
Optionally, you can define a capture group to replace only the part within the capture group, but still match against the whole regex.

A 'rootDir' can be defined to resolve the file paths from. This defaults to `process.cwd()`. In a lot of cases, this is already the project root in most cases.

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
