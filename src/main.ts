import { createApp } from 'vue'
import './scss/global.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
