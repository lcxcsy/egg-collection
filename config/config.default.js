/*
 * @Author: liuchenxi
 * @Date: 2021-10-19 11:51:52
 * @LastEditTime: 2021-10-20 09:25:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-colloection\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = { }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1634615484345_721'

  // Socket.io
  config.io = {
    namespace: {
      '/': {
        connectionMiddleware: ['connection'], // 连接中间件，这里可以做一些权限校验之类的操作
        packetMiddleware: [] // 通常用于对消息做预处理，又或者是对加密消息的解密等操作
      }
    }
  }

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig
  }
}
