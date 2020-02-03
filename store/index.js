export const state = () => ({
    isAuth: false
})

export const mutations = {
    SET_IS_AUTH(state, payload) {
        state.isAuth = payload
    }
}

export const actions = {
    nuxtServerInit({ commit }, context) {
        commit('SET_IS_AUTH', context.app.$auth.$state.loggedIn)
    }
}