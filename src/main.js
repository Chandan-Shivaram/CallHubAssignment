import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createWebHistory, createRouter } from "vue-router"
import HelloWorld from './components/HelloWorld.vue'
import mapping from './components/mapping.vue'
const app = createApp(App,{ silent: true })
app.config.productionTip = false
const routes = [
    {
      path: "/",
      name: "mapping",
      component: mapping,
    },
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.mount('#app')