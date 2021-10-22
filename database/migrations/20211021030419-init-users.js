/*
 * @Author: 刘晨曦
 * @Date: 2021-10-20 16:54:45
 * @LastEditTime: 2021-10-21 16:35:36
 * @LastEditors: Please set LastEditors
 * @Description: 初始化数据库表
 * @FilePath: \egg-collection\database\migrations\20211020085445-init-users.js
 */
'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('user', { id: Sequelize.INTEGER });
     */
    // 在执行数据库升级时调用的函数，创建 users 表
    const { UUID, INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('users', {
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
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // 在执行数据库降级时调用的函数，删除 user 表
    await queryInterface.dropTable('users')
  }
}
