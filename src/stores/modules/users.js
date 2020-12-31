import account from '../../api/account'
// initial state
const state = () => ({
    all: []
})
// getters
const getters = {}

// actions
const actions = {
    getAllUsers ({ commit }) {
            account.getUserList().then(res => {
            if (res && res.success) {
                commit('setUsers', res.data)
            }
        })
    }
}

// mutations
const mutations = {
    setUsers (state, users) {
        state.all = users
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
