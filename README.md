<!--
 * @Author: 刘晨曦
 * @Date: 2021-10-19 11:41:30
 * @LastEditTime: 2021-10-20 16:19:18
 * @LastEditors: Please set LastEditors
 * @Description: Egg-Collection 说明文档
 * @FilePath: \MyGithub\egg-colloection\README.md
-->

# Egg-collection

> Generate the APIs needed in the project based on Egg.js

## 快速开始

```sh
# 初始化项目
npm init egg --type=simple
# 安装依赖
npm install
# 运行项目
npm run dev
```

## Socket.io

基本的配置的可以参考官网给的例子：

[Socket.io](https://eggjs.org/zh-cn/tutorials/socketio.html)
[Vue-Socket.io](https://github.com/MetinSeylan/Vue-Socket.io)

Demo：
Server Side:

```js
// config/config.[XXXX].js
config.io = {
  namespace: {
    '/': {
      connectionMiddleware: ['connection'], // 连接中间件，这里可以做一些权限校验之类的操作
      packetMiddleware: [] // 通常用于对消息做预处理，又或者是对加密消息的解密等操作
    }
  }
};

// config/plugin.js
exports.io = {
  enable: true,
  package: 'egg-socket.io'
};

// app/io/controller/nsp.js
const Controller = require('egg').Controller;

class NspController extends Controller {
  async index() {
    const { ctx } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('index', `Hi, Client! I've got your message: ${message}`);
  }
}

module.exports = NspController;

// app/router.js
// 路由负责将 socket 连接的不同 events 分发到对应的 controller ws://localhost:7001/
io.of('/').route('index', io.controller.nsp.index);
```

Client Side (Vue2):

```js
// main.js
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO(process.env.VUE_APP_WS, {
      query: {
        name: 'Client',
        userId: Math.random()
      }
    })
  })
);

const initApp = function () {
  new Vue({
    sockets: {
      connect: function () {
        console.log('socket connected');
      }
    },
    router,
    render: h => h(App)
  }).$mount('#app');
};

// component
export default {
  name: 'Home',
  mounted() {
    // 订阅消息
    this.sockets.subscribe('index', data => {
      console.log('index', data);
    });

    setTimeout(() => {
      // 发送消息给服务端 NspController.index 方法会被执行
      this.$socket.emit('index', 'Hello Server');
    }, 1000 * 8);
  }
};
```
