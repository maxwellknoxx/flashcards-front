import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import login from './components/login'
import dictionaries from './components/dictionaries'
import expressions from './components/expressions'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [

   { path: '/login', component: login },
   { path: '/dictionaries', component: dictionaries },
   { path: '/expressions/:data', component: expressions }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
