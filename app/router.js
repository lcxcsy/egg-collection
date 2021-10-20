/*
 * @Author: your name
 * @Date: 2021-10-19 11:51:52
 * @LastEditTime: 2021-10-20 14:12:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-colloection\app\router.js
 */
'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app
  router.get('/', controller.home.index)

  // socket.io
  // 路由负责将 socket 连接的不同 events 分发到对应的 controller ws://localhost:7001/
  io.of('/').route('index', io.controller.nsp.index)
}
