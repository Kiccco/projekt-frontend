import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const store = createStore({
    state() {
        return {
            user: null,
            token: null
        }
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
    }
})

app.use(router)
app.use(store)

app.mount('#app')
