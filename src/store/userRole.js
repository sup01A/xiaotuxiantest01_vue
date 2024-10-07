import {defineStore} from "pinia";
import {ref} from "vue";
export const userRoleInfoStore = defineStore('userRole',()=>{
    const userRoleData = ref({
        roleId: -1
    })
    const setRoleId = (roleId)=>{
        userRoleData.value.roleId = roleId
    }
    return{
        userRoleData,setRoleId
    }
},{
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'roleId', // 持久化数据的键名
                storage: localStorage, // 存储方式，默认是 localStorage
            }
        ]
    }
    }
)