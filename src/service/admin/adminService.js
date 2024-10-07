import {instance} from "@/service/request.js";
// 测试
export const deptTestServiceApi =()=>{
    return instance.get('/admin');
}