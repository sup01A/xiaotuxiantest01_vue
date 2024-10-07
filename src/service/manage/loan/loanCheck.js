import {instance} from "@/service/request.js";
const base = '/manage/loanCheck'
//根据搜索条件获取
export const getByConditionServiceApi = (data)=>{
    return instance.get(base + '/byCondition',{params:data})
}