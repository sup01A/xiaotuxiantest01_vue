
import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {router} from "@/route/index.js";
import App from './App.vue'

const app = createApp(App);
app.use(router)
app.use(ElementPlus,{
    locale: zhCn
})
app.mount('#app')