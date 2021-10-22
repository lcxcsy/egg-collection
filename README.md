<!--
 * @Author: 刘晨曦
 * @Date: 2021-10-19 11:41:30
 * @LastEditTime: 2021-10-21 13:45:51
 * @LastEditors: Please set LastEditors
 * @Description: Egg-Collection 说明文档
 * @FilePath: \MyGithub\egg-colloection\README.md
-->

# Egg-collection

> Generate the APIs needed in the project based on Egg.js

## QuickStart

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

    // 发送消息给服务端 NspController.index 方法会被执行
    this.$socket.emit('index', 'Hello Server');
  }
};
```

## DataBase

通过 ORM 框架`Sequelize`连接`MySQL`数据库源，[配置方法](https://eggjs.org/zh-cn/tutorials/sequelize.html)。

```sh
# 安装相关依赖
npm install --save egg-sequelize mysql2
```

### Sequelize

一些基础命令：

```js
// 新增 (INSERT)
// 1.INSERT INTO table_name ( field1, field2,...fieldN ) VALUES ( value1, value2,...valueN );
Model.create({ firstName: 'Jane', lastName: 'Doe' });
// 2.批量新增
Model.bulkCreate([{ name: 'Jack Sparrow' }, { name: 'Davy Jones' }]);

// 查询 (SELECT
// 1.查询所有(SELECT * FROM ...)
Model.findAll();
// 2.特定查询 (SELECT foo, bar FROM ...)
Model.findAll({ attributes: ['foo', 'bar'] });
// 3.重命名 (SELECT foo, bar AS baz, qux FROM ...)
Model.findAll({ attributes: ['foo', ['bar', 'baz'], 'qux'] });
// 4.聚合 (SELECT foo, COUNT(hats) AS n_hats, bar FROM ...)
Model.findAll({ attributes: ['foo', [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'], bar'] });
// 5.条件查询 (SELECT * FROM post WHERE authorId = 2)
Model.findAll({ where: { authorId: 2 }});

// 更新 (UPDATE)
// UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause]
Model.update({ lastName: "Doe" }, { where: { lastName: null }});

// 删除 (DELETE)
// DELETE FROM table_name [WHERE Clause]
await User.destroy({  where: { firstName: "Jane" }});

// 限制和分页
Project.findAll({ limit: 10 }); // 提取10个实例/行
Project.findAll({ offset: 8 }); // 跳过8个实例/行
Project.findAll({ offset: 5, limit: 5 }); // 跳过5个实例,然后获取5个实例
```

### Migrations

`Migrations`类似于`Git`版本控制系统来跟踪数据库的变化，导出两个函数，up 和 down，指示如何执行迁移和撤消迁移。

相关命令：

```sh
# 初始化 Migrations 配置文件和目录
npx sequelize init:config
npx sequelize init:migrations

# 创建users表
npx sequelize migration:generate --name=init-users

# 升级数据库
npx sequelize db:migrate

# 回退数据库
npx sequelize db:migrate:undo

# 回退到初始状态
npx sequelize db:migrate:undo:all
```
