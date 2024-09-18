import {instance} from "@/service/request.js";
// 获取所有系别信息
export const deptServiceApi =()=>{
    return instance.get('/dept/list');
}