export const state = () => ({
    categories: [],
    errors: [],
    page: 1
})

export const mutations = {
    SET_CATEGORY_DATA(state, payload) {
        state.categories = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    }
}

export const actions = {
    getCategoriesData({ commit, state }, payload) {
        let search = payload ? payload:''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/categories?q=${search}&page=${state.page}`).then((response) => {
                commit('SET_CATEGORY_DATA', response.data.data)
                resolve()
            })
        })
    },
    storeCategoryData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/categories', payload)
            .then(() => {
                dispatch('getCategoriesData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    // getData({ commit }, payload) {
    //     return new Promise((resolve, reject) => {
    //         this.$axios.get(`/users/${payload}`).then((response) => {
    //             commit('SET_DATA', response.data.data)
    //             resolve()
    //         })
    //     })
    // },
    updateCategoryData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put(`/categories/${payload.id}`, payload)
            .then(() => {
                dispatch('getCategoriesData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    destroyCategoryData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/categories/${payload}`)
            .then(() => {
                dispatch('getCategoriesData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },

}