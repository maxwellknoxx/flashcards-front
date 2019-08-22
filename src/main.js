import Vue from 'vue'
import Vuex from 'vuex'
import store  from './store/store'
import App from './App.vue'
import VueRouter from 'vue-router'
import home from './components/home'
import login from './components/login'
import logout from './components/logout'
import newUser from "./components/newUser"
import recoverInformation from './components/recoverInformation'
import dictionaries from './components/dictionaries'
import expressions from './components/expressions'
import play from './components/play'
import practise from './components/practise'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)


const routes = [

   { path: '/app', component: App },
   { path: '/login', component: login },
   { path: '/logout', component: logout },
   { path: '/newUser', component: newUser },
   { path: '/recoverInformation', component: recoverInformation },
   { path: '/dictionaries/:data', component: dictionaries },
   { path: '/expressions/:data', component: expressions },
   { path: '/play/:data', component: play },
   { path: '/practise', component: practise },
   { path: '/', component:  home},
   { path: '/home', component:  home}

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
