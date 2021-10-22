/*
 * @Author: 刘晨曦
 * @Date: 2021-10-19 11:51:52
 * @LastEditTime: 2021-10-21 11:34:10
 * @LastEditors: Please set LastEditors
 * @Description: 新增Socket.io 插件
 * @FilePath: \egg-colloection\config\plugin.js
 */
'use strict'

/** @type Egg.EggPlugin */

// Socket.io
exports.io = {
  enable: true,
  package: 'egg-socket.io'
}

// Sequelize
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

// Egg-validate
exports.validate = {
  enable: true,
  package: 'egg-validate'
}
