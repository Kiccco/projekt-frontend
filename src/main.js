import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faXmark, faUser, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faWindowMinimize } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
library.add(faXmark, faWindowMaximize, faSquare, faWindowMinimize, faUser, faGear, faArrowRightFromBracket)



const app = createApp(App)

const store = createStore({
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
        setUser(context, user) {
            context.commit("setUser")
        },
        setToken(context) {
            context.commit("setToken")
        }
    }
})
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)

app.mount('#app')
