import axios from 'axios' // 引入axios
import authToken from './authToken'
import apiUrls from '../api/urls'

const redirectToLogin = () => {
    authToken.clearAllToken()
    this.$router.push({ path: '../pages/Login' })
}
const refreshToken = (params) => { return axios.post(apiUrls.account.refresh, params).then(res => res.data) }
// 是否正在刷新token
let isRefreshing = false
// 重试队列，如果同时接受N个请求，需要逐一刷新
let requests = []
axios.defaults.timeout = 10 * 1000
axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
axios.defaults.headers = {
    get: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    post: { 'Content-Type': 'application/json;charset=utf-8' }
}

// request拦截器
axios.interceptors.request.use(
    config => {
        var accessToken = authToken.getAccessToken()
        if (accessToken) {
            config.headers.Authorization = 'Bearer ' + accessToken
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)
// reponse拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        var originalRequest = error.config
        var errReponse = error.response
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
            originalRequest._retry = true
            return null
        }
        if (errReponse.status === 401 && errReponse.headers['token-expired']) {
            if (!isRefreshing) {
                isRefreshing = true
                return refreshToken({
                    refreshToken: authToken.getRefreshToken(),
                    accessToken: authToken.getAccessToken()
                }).then((res) => {
                    if (res && res.success) {
                        var accessToken = res.data.accessToken
                        var refreshToken = res.data.refreshToken
                        if (accessToken && refreshToken) {
                            authToken.setAccessToken(accessToken)
                            authToken.setRefreshToken(refreshToken)
                            originalRequest.headers.Authorization = 'Bearer ' + accessToken
                            return axios(originalRequest)
                        }
                    } else {
                        redirectToLogin()
                    }
                }).catch(res => {
                    requests = []
                    redirectToLogin()
                }).finally(() => {
                    isRefreshing = false
                })
            } else {
                 return new Promise((resolve) => {
                     requests.push((token) => {
                        originalRequest.headers.Authorization = 'Bearer ' + token
                        resolve(axios(originalRequest))
                     })
                 })
            }
        }
        return Promise.reject(error)
    }
)

export default axios
