import axios from 'axios'
// import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.baseURL = 'http://localhost:8080/data'

export function get (url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        console.log('response: ' + response)
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
