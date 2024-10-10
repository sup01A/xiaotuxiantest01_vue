import {instance} from "@/service/request.js";
const base = '/manage/loanCheck'
//根据搜索条件获取
export const getByConditionServiceApi = (data)=>{
    return instance.get(base + '/byCondition',{params:data})
}
//删除贷款记录
export const deleteUploadLoan = (data)=>{
    return instance.delete(base + '/delete',{params: data})
}