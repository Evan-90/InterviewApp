这是一个基于 [Create React App](https://github.com/facebookincubator/create-react-app)的项目.


### 本地开发环境安装

- 首先你需要克隆项目到你到本地环境

- 进入项目根目录你需要这些操作：

```
- npm install
- npm run eject
- npm satrt
```

- 你可以看见这样的文件目录：
```
my-app/
  README.md ------说明文档
  node_modules/ --依赖包文件
  package.json ---npm配置文件
  public/ --------公共静态资源和模块
  src/ -----------业务编程文件
    config.js ----模块公共配置
    index.js  ----模块入口文件
    reducer.js ---redux的reducer
    componets/ ---组件
    container/ ---页面
    img/ ---------图片资源
    redux/ -------redux文件
    util/ --------工具方法
```

- 项目打包：

```
npm run build
```
