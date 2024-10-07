import {instance} from "@/service/request.js";
export const userLoginServiceApi = (data)=>{
    const params = new URLSearchParams();
    params.append('account', data.account);
    params.append('password', data.password);
    params.append('roleId', data.roleId);
    params.append('accept', data.accept);
    return instance.post('/login',params)
}