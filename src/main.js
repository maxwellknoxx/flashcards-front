import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import login from './components/login'
import dictionaries from './components/dictionaries'
import expressions from './components/expressions'
import play from './components/play'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [

   { path: '/login', component: login },
   { path: '/dictionaries/:data', component: dictionaries },
   { path: '/expressions/:data', component: expressions },
   { path: '/play/:data', component: play }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
