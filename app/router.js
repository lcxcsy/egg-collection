/*
 * @Author: 刘晨曦
 * @Date: 2021-10-19 11:51:52
 * @LastEditTime: 2021-10-21 16:53:27
 * @LastEditors: Please set LastEditors
 * @Description: 定义路由相关操作
 * @FilePath: \egg-colloection\app\router.js
 */
'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app
  router.get('/', controller.home.index)

  // 用户的相关接口 CURD
  router.post('createUser', '/user/create', controller.user.create)
  router.post('updateUser', '/user/update', controller.user.update)
  router.get('userDetail', '/user/detail/:userId', controller.user.detail)
  router.post('deleteUser', '/user/delete', controller.user.delete)

  // socket.io
  // 路由负责将 socket 连接的不同 events 分发到对应的 controller ws://localhost:7001/
  io.of('/').route('index', io.controller.nsp.index)
}
