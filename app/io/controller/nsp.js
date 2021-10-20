/*
 * @Author: your name
 * @Date: 2021-10-19 16:29:01
 * @LastEditTime: 2021-10-20 13:56:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-colloection\app\io\controller\nsp.js
 */
const Controller = require('egg').Controller

class NspController extends Controller {
  async index () {
    const { ctx } = this
    const message = ctx.args[0]
    await ctx.socket.emit('index', `Hi, Client! I've got your message: ${message}`)
  }
}

module.exports = NspController
