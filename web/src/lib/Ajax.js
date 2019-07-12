import qs from 'query-string'
import fetch from 'node-fetch'
import { API_URL } from './../config'

class Ajax {

  /**
   *
   * @param {string} path
   * @param {FormData|Object} [params]
   * @param {Object} [headers]
   * @returns {Promise<*>}
   */
  static async get(path, params, headers) {
    headers = Object.assign({/* Some headers */}, headers)
    const options = { method: 'GET', headers }
    const res = await fetch(Ajax.preparePath(path, params), options)
    return res.status === 200 ? await res.json() : null
  }

  /**
   *
   * @param {string} path
   * @param {FormData|Object} [params]
   * @param {Object} [headers]
   * @returns {Promise<*>}
   */
  static async post(path, params = {}, headers = {}) {
    const options = { method: 'POST' }
    if (params instanceof FormData) {
      options.body = params
      options.headers = headers
    } else {
      options.body = JSON.stringify(params)
      options.headers = Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, headers)
    }

    const res = await fetch(Ajax.preparePath(path), options)
    return res.status === 200 ? await res.json() : null
  }

  /**
   *
   * @param {string} path
   * @param {Object} [params]
   * @returns {string}
   */
  static preparePath(path, params) {
    path = String(path).replace(/^(\/)|(\/)$/, '')
    const url = [API_URL]
    if (path) {
      url.push(path)
    }
    if (params) {
      url.push(`?${qs.stringify(params)}`)
    }
    return url.join('/')
  }
}

export default Ajax