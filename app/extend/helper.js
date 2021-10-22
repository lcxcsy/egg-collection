/*
 * @Author: 刘晨曦
 * @Date: 2021-10-19 16:50:29
 * @LastEditTime: 2021-10-21 15:50:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-colloection\app\extend\help.js
 */
const dayjs = require('dayjs')

module.exports = {
  /**
   * @description: 格式化返回体
   * @param {*} data 返回内容
   * @param {*} msg 返回消息
   * @param {*} code 返回的状态码
   * @return {*}
   */
  parseMsg (data = {}, msg = 'SUCCESS', code = '0') {
    return {
      code, msg, data
    }
  },

  /**
   * @description: Socket 推送格式化的消息体
   * @param {*} action 发送的事件
   * @param {*} payload 负载内容
   * @param {*} metadata meta信息 默认为当前的时间戳
   * @return {*}
   */
  parseSocketMsg (action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now()
    }, metadata)

    return {
      meta, data: { action, payload }
    }
  },

  /**
   * @description: 转换为整型
   * @param {*} string
   * @return {*}
   */
  parseInt (string) {
    if (typeof string === 'number') return string
    if (!string) return string
    return parseInt(string) || 0
  },

  /**
   * @description: 驼峰转为下划线
   * @param {*} params { 'object' | 'string' } 需要转换的参数
   * @return {*}
   */
  camel2Line (params = {}) {
    const toLine = (name) => {
      return name.replace(/([A-Z])/g, '_$1').toLowerCase()
    }

    if (typeof params === 'object' ) {
      const res = {}
      for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
          res[toLine(key)] = params[key]
        }
      }
      return res
    } else if (typeof params === 'string') {
      return toLine(params)
    }
  },

  /**
   * @description: 时间格式化
   * @param {*} date 需要格式化的时间
   * @return {*} 格式化后的事件
   */
  formatDate (date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
  }

}
