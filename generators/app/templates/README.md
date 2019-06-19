## 脚手架自动生成

```
npm install -g yo
npm install -g generator-vue-pc
yo vue-pc
```


## 安装项目依赖

```
yarn install
```

### 开发环境启动

```
yarn run serve
```

### 生产环境编译

```
yarn run build
```

### 生成页面

```
yo vue-pc:page pageName
```

### 生成组件

```
yo vue-pc:component componentName
```

### 生成 store

```
yo vue-pc:store storeName
```

### 开发一个页面流程

- yo vue-pc:page pageName

- yo vue-pc:store storeName

- 在 router.js 中添加 page 路由

- 在 store/index 中添加 store

### 开发一个组件流程

- yo vue-pc:component componentName

- 通用组件命名 hp-组件名

- 业务组件命名 sl-组件名

- 在相应的 page 引入组件

### 注意事项

- 在使用 elementUi 的时候需要在 plugins 中引入相应的组件 懒加载使用

- 在 store 新增 mutations、getters 之后需要在 page 中使用 mapGetters, mapMutations 引入

- 开发环境存在跨域请配置 vue.config.js 中的 devserver

- 生产环境打包需要配置.env.production

- vue.config.js中 outputDir 可以配置生产环境打包后的路径

- api文件夹中可以创建请求相关的文件
