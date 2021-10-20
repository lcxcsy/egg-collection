/*
 * @Author: your name
 * @Date: 2021-10-20 09:17:44
 * @LastEditTime: 2021-10-20 14:07:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-collection\app\io\middleware\connection.js
 */
module.exports = app => {
  return async (ctx, next) => {
    const { app, socket, helper, logger } = ctx
    const socketId = socket.id
    const query = socket.handshake.query

    // 用户信息
    const { userName, userId } = query

    logger.debug('#user_info', socketId, userName, userId)

    const io = app.io
    io.on('connection', (socket) => {
      // 心跳测试
      setInterval(() => {
        socket.emit('heartBeat', helper.parseMsg('heartBeat', { msg: `Server's heartBeat` }))
      }, 1000 * 4)
    })

    await next()
    // execute when disconnect.
    console.log('disconnection!')
  }
}
