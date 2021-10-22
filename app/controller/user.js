/*
 * @Author: 刘晨曦
 * @Date: 2021-10-20 17:01:08
 * @LastEditTime: 2021-10-21 17:33:50
 * @LastEditors: Please set LastEditors
 * @Description: User表的CURD
 * @FilePath: \egg-collection\app\controller\user.js
 */
'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async index () {
    const ctx = this.ctx
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset)
    }
    ctx.body = await ctx.service.user.list(query)
  }

  async detail () {
    const { ctx, app } = this
    const params = ctx.params
    const invalid = app.validator.validate({ userId: 'string' }, params)
    ctx.status = 200
    if (invalid) {
      ctx.body = ctx.helper.parseMsg('查询失败', JSON.stringify(invalid), '-1')
    } else {
      try {
        const user = await ctx.service.user.find(params.userId)
        ctx.body = ctx.helper.parseMsg(user)
      } catch (err) {
        ctx.body = ctx.helper.parseMsg('查询失败', err.toString(), '-1')
      }
    }
  }

  async create () {
    const { ctx, app } = this
    const invalid = app.validator.validate({ userName: 'string', age: 'int' }, ctx.request.body)
    ctx.status = 200
    if (invalid) {
      ctx.body = ctx.helper.parseMsg('创建失败', JSON.stringify(invalid), '-1')
    } else {
      await ctx.service.user.create(ctx.request.body)
      ctx.body = ctx.helper.parseMsg('创建成功')
    }
  }

  async update () {
    const { ctx, app } = this
    const body = ctx.request.body
    const invalid = app.validator.validate({ userId: 'string', userName: 'string?', age: 'int?' }, body)
    ctx.status = 200
    if (invalid) {
      ctx.body = ctx.helper.parseMsg('更新失败', JSON.stringify(invalid), '-1')
    } else {
      try {
        await ctx.service.user.update({ updates: body })
        ctx.body = ctx.helper.parseMsg('更新成功')
      } catch (err) {
        ctx.body = ctx.helper.parseMsg('更新失败', err.toString(), '-1')
      }
    }
  }

  async delete () {
    const { ctx, app } = this
    const body = ctx.request.body
    const invalid = app.validator.validate({ userIds: 'array' }, body)
    ctx.status = 200
    if (invalid) {
      ctx.body = ctx.helper.parseMsg('删除失败', JSON.stringify(invalid), '-1')
    } else {
      try {
        await ctx.service.user.delete(body.userIds)
        ctx.body = ctx.helper.parseMsg('删除成功')
      } catch (err) {
        ctx.body = ctx.helper.parseMsg('删除失败', err.toString(), '-1')
      }
    }
  }
}

module.exports = UserController
