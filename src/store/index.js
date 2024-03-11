import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const store = new Vuex.Store({
    state: {
        user: null,
        token: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },

        getToken(state) {
            return state.token
        }
    },
    actions: {
    },
    plugins: [vuexLocal.plugin]
})

export default store