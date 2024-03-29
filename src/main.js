import './assets/main.css'

import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faXmark, faUser, faGear, faArrowRightFromBracket, faSignOut, faUserPlus, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faWindowMinimize } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import VueCookies from 'vue-cookies'
import './output.css'


library.add(faXmark, faWindowMaximize, faSquare, faWindowMinimize, faUser, faGear, faArrowRightFromBracket, faSignOut, faUserPlus, faEllipsis)



const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)
app.use(VueCookies)

app.mount('#app')
