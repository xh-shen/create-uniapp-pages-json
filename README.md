## create-uniapp-pages-json

根据路由配置生成 uni-app 的 pages.json 文件，开发时支持实时监听路由文件变化，重新生成 pages.json 文件。

# 痛点

通常的，当我们开发 uni-app 时，`pages.json`文件都是一个不可磨灭的痛，添加页面时必须先在`pages.json`中添加配置，而且不可动态更改，无法个性化配置。

---

# 特性

1、用法简单，配置便捷
2、开发时支持实时监听

# Step 1

安装工具

```sh
# Yarn
yarn add create-uniapp-pages-json --dev

# Npm
npm install create-uniapp-pages-json --save-dev
```

# Step 2

生成配置文件

```sh
npx pages-config-json-init
```

此时项目根目录会生成一个 pages.config.json 的文件，内容如下：

```json
{
  "rootPath": "./",
  "modulePath": "./",
  "defaultConfigFile": "",
  "routeFileName": ""
}
```

可以手动自行创建

## 配置参数说明

### rootPath

生成的 pages.json 存放的位置，对于 uni-app 项目，如果是用`cli`创建的，`rootPath`的值应为`"./src"`， 如果是用工具创建的，`rootPath`的值应为`"./"`，如果不配置，默认值为`"./"`。

### modulePath

模块目录路径，有些项目是拆成子模块开发的，命令会在该路径下递归查找
`"routeFileName"`配置的文件名称，如果不配置，默认值为`"./"`，从根目录往下查找。

### defaultConfigFile

由于`pages.json`文件的配置中，不光有页面路由配置，还有很多其他的全局配置，所以其他配置需要有一个文件来承载，此参数为必填参数，必须是相对路径+文件名称，例如：`"./src/global.js"`,

```js
module.exports = {
  pages: [],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-app',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
  },
}
```

必须使用 commonjs 导出。

### routeFileName

路由配置文件名称，此参数为必填参数，例如：`"index.route.js"`,

```js
module.exports = [
  {
    path: '/pages/ep-app-login/views/login/index',
    name: 'login',
    isRoot: true, // 此属性会让改路由生成在pages.json的首位。
    style: {
      navigationBarTitleText: '绑定',
    },
  },
  {
    path: '/pages/ep-app-login/views/home/index',
    name: 'home',
    aliasPath: '/',
    style: {
      navigationBarTitleText: '首页',
    },
  },
]
```

必须使用 commonjs 导出。

# Step 3

开始生成 pages.json 文件

1. 单独使用

```sh
npx create-uniapp-pages-json
```

2. 配置 package.json 中

```json
{
  ...
  "scripts": {
    "create": "create-uniapp-pages-json",
    ...
  },
  ...
}

```

3. 配置 package.json 中和开发命令并行使用

```json
{
  ...
  "scripts": {
    "serve": "create-uniapp-pages-json && npm run dev:h5",
    "build": "create-uniapp-pages-json && npm run build:h5",
    ...
  },
  ...
}
```

# Step 4

可选，如果需要在开发中实时监听`routeFileName | defaultConfigFile`配置文件的变化，还需要在`vue.config.js`文件中使用`webpack`插件

```js
const { WatchUniAppRoutesPlugin } = require('create-uniapp-pages-json');

module.exports = {
  configureWebpack: {
    plugins: [
      new WatchUniAppRoutesPlugin()
    ]
  },
  ...
}
```

---

欢迎使用，并给我一些反馈和建议，让这个插件做的更好，新功能准备中
