import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import home from './components/home'
import login from './components/login'
import newUser from "./components/newUser"
import recoverInformation from './components/recoverInformation'
import newPassword from './components/newPassword'
import dictionaries from './components/dictionaries'
import expressions from './components/expressions'
import play from './components/play'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [

   { path: '/login', component: login },
   { path: '/newUser', component: newUser },
   { path: '/recoverInformation', component: recoverInformation },
   { path: '/newPassword/:data', component: newPassword },
   { path: '/dictionaries/:data', component: dictionaries },
   { path: '/expressions/:data', component: expressions },
   { path: '/play/:data', component: play },
   { path: '/', component:  home}

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
