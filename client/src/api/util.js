import { route } from 'preact-router'
import config from '../../../config/client'

export const relog = () => {
  localStorage.removeItem('token')
  route('/register')
}

export const request = (method, endpoint, data) => {
  let body = null
  let qs = ''
  if (method === 'GET' && data) {
    // encode data into the querystring
    // eslint-disable-next-line prefer-template
    qs = '?' + Object.keys(data)
      .filter(k => data[k] !== undefined)
      .map(k => `${k}=${encodeURIComponent(data[k])}`)
      .join('&')
  } else {
    body = data
  }
  return fetch(config.apiEndpoint + endpoint + qs, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: body && JSON.stringify(body)
  })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.kind === 'badToken') return relog()

      return resp
    })
    .catch(err => {
      console.debug(err)
    })
}
