// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import '../static/css/style.css'
import '../static/css/barrager.css'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: App
}]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  ...App
})
app.$mount('#app')
