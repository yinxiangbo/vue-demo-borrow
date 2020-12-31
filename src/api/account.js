import apiUrls from '../api/urls'
import axios from '../utils/http'
const login = {
  login: (params) => { return axios.post(apiUrls.account.login, params) },
  logout: (params) => { return axios.get(apiUrls.account.logout, params) },
  refreshToken: (params) => { return axios.get(apiUrls.account.refresh, { params: params }).then(res => res.data) },
  getUserList: () => { return axios.get(apiUrls.account.getUsers).then(res => res.data) }
}
export default login
