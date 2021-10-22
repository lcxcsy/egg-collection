/*
 * @Author: 刘晨曦
 * @Date: 2021-10-21 09:34:17
 * @LastEditTime: 2021-10-22 09:13:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-collection\app\service\user.js
 */
'use strict'

const Service = require('egg').Service
const { Op } = require('sequelize')

class User extends Service {
  async list ({ offset = 0, limit = 10 }) {
    return this.ctx.model.User.findAndCountAll({
      offset,
      limit,
      order: [['created_at', 'desc'], ['id', 'desc']]
    })
  }

  async find (id) {
    const user = await this.ctx.model.User.findByPk(id)
    if (!user) {
      throw new Error('user not found')
    }
    return user
  }

  async create (user) {
    return this.ctx.model.User.create(user)
  }

  async update ( updates ) {
    const { userId } = updates
    const user = await this.ctx.model.User.findByPk(userId)
    if (!user) {
      throw new Error('user not found')
    }
    return user.update(updates)
  }

  async delete (userIds) {
    const user = await this.ctx.model.User.destroy({
      where: {
        userId: { [Op.in]: userIds }
      }
    })
    if (!user) {
      throw new Error('user not found')
    } else {
      return
    }
  }
}

module.exports = User
