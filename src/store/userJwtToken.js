import {defineStore} from "pinia";
import {ref} from "vue";
export const useTokenStore = defineStore('token',()=>{
        const token = ref('')
        const setToken = (newToken)=>{
            token.value = newToken
        }
        const removeToken = ()=>{
            token.value = ''
        }
        return{
            token,setToken,removeToken
        }
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    key: 'token', // 持久化数据的键名
                    storage: localStorage, // 存储方式，默认是 localStorage
                }
            ]
        }
    }
)