
import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {router} from "@/route/index.js";
import App from './App.vue'
import '@/assets/main.css';
import {createPinia} from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist';
const pinia = createPinia()

const app = createApp(App);


pinia.use(piniaPluginPersist);
app.use(pinia)
app.use(router)
app.use(ElementPlus,{
    locale: zhCn
})
app.mount('#app')