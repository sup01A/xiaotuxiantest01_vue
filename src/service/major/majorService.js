import {instance} from "@/service/request.js";
// 获取所有专业带系别属性的信息
export const majorWithDeptServiceApi = ()=>{
    return instance.get('/major/list')
}
//分页获取所有专业带系别属性的信息
export const majorPageWithDeptServiceApi = (data)=>{
    return instance.get('/major/pagelist',{params:data})
}
//更新一条专业信息
export const updateOneMajorServiceApi = (data)=>{
    return instance.put('/major/update',data)
}
//新增一条专业信息
export const addOneMajorServiceApi = (data)=>{
    return instance.post('/major/add',data)
}