/*
 * @Author: your name
 * @Date: 2021-10-19 11:51:52
 * @LastEditTime: 2021-10-19 14:46:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \egg-colloection\app\controller\home.js
 */
'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }
}

module.exports = HomeController
