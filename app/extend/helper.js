/*
 * @Author: your name
 * @Date: 2021-10-19 16:50:29
 * @LastEditTime: 2021-10-19 16:50:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-colloection\app\extend\help.js
 */
module.exports = {
  parseMsg (action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now()
    }, metadata)

    return {
      meta,
      data: {
        action,
        payload
      }
    }
  }
}
