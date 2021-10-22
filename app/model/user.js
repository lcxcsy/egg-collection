/*
 * @Author: 刘晨曦
 * @Date: 2021-10-20 16:58:50
 * @LastEditTime: 2021-10-21 16:02:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-collection\app\models\user.js
 */
'use strict'

const dayjs = require('dayjs')

module.exports = app => {
  const { UUID, INTEGER, DATE, STRING } = app.Sequelize

  const User = app.model.define('users', {
    userId: {
      type: UUID,
      primaryKey: true,
      defaultValue: app.Sequelize.UUIDV4,
      unique: true,
      field: 'user_id',
      comment: '用户ID'
    },
    userName: {
      type: STRING(30),
      field: 'user_name',
      comment: '用户姓名'
    },
    age: INTEGER,
    createdAt: {
      type: DATE,
      field: 'created_at',
      comment: '创建时间'
    },
    updatedAt: {
      type: DATE,
      field: 'updated_at',
      comment: '更新时间'
    }
  })

  return User
}
