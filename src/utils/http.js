import axios from 'axios' // 引入axios
import authToken from './authToken'
import apiUrls from '../api/urls'

const redirectToLogin = () => { authToken.clearAllToken() }
const refreshToken = (params) => { return axios.post(apiUrls.account.refresh, params).then(res => res.data) }
axios.defaults.timeout = 10 * 1000
axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
axios.defaults.headers = {
    get: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
        'Content-Type': 'application/json;charset=utf-8'
    }
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
        var errReponse = error.response
        if (errReponse.status === 401 && errReponse.headers['token-expired']) {
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
                            error.config.headers.Authorization = 'Bearer ' + accessToken
                            return axios(error.config)
                        }
                    } else {
                        redirectToLogin()
                    }
                })
            }
        }
        // Promise.reject(error)
)

export default axios
