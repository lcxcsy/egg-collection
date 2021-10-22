/*
 * @Author: 刘晨曦
 * @Date: 2021-10-20 16:34:24
 * @LastEditTime: 2021-10-21 14:57:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-collection\app.js
 */
module.exports = app => {
  app.beforeStart(async () => {
    app.logger.debug('app init')
  })
}
