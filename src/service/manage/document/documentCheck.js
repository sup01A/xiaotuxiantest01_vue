import {instance} from "@/service/request.js";
const base = '/manage/documentCheck'
export const getAllDocumentServiceApi = ()=>{
    return instance.get(base)
}
//根据搜索条件获取
export const getByConditionServiceApi = (data)=>{
    return instance.get(base + '/byCondition',{params:data})
}
//更新证件审核状态
export const updateStatus = (data)=>{
    return instance.put(base + '/updateStatus',data)
}