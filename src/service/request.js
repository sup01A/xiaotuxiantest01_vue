import axios from "axios";
import {router} from "@/route/index.js";
import {ElNotification} from "element-plus";
import {h} from "vue";
import {useTokenStore} from "@/store/userJwtToken.js";
const baseURL = '/api';
const timeout = 5000;
export const instance = axios.create({baseURL,timeout});
// 添加请求拦截器
instance.interceptors.request.use((config)=> {
    const tokenStore = useTokenStore();
    //如果值不为空
    if (tokenStore.token){
        config.headers.Authorization=tokenStore.token
    }
    // 在发送请求之前做些什么
    return config;
}, (error) =>{

    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response)=>{
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, (error)=>{
    //401用户登录权限认证失败
    if (error.response.status === 401){
        ElNotification({
            title: '提示',
            message: h('b', { style: 'color: red;font-size: 18px' }, "请先登录！"),
            duration: 2000,
            type: 'warning'
        })
        router.push('/')
    }else {
        // 暂时简单处理其他错误
        ElNotification({
            title: '提示',
            message: h('b', { style: 'color: red;font-size: 18px' }, "服务器错误"),
            duration: 2000,
            type: 'warning'
        })
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});