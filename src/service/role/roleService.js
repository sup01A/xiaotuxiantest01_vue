import {instance} from "@/service/request.js";
// 获取所有角色信息
export const roleServiceApi =()=>{
    return instance.get('/role');
}