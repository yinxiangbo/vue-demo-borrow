
const accessToken = 'accessToken'
const refreshtoken = 'refreshToken'

function getAccessToken () {
    return window.localStorage.getItem(accessToken)
}

function setAccessToken (token) {
    return window.localStorage.setItem(accessToken, token)
}

function getRefreshToken () {
    return window.localStorage.getItem(refreshtoken)
}

function setRefreshToken (refreshToken) {
    return window.localStorage.setItem(refreshtoken, refreshToken)
}

function clearToken (token) {
    window.localStorage.removeItem(token)
}

function clearAllToken () {
    window.localStorage.removeItem(accessToken)
    window.localStorage.removeItem(refreshtoken)
}

export default {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    clearToken,
    clearAllToken
}
