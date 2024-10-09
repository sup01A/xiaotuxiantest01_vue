import {instance} from "@/service/request.js";
const base = '/student/document'
export const getUploadPicture = ()=>{
    return instance.get( base + '/getUpload')
}
//el-upload不使用axios，要加/api完成代理跨域
export const idCardPictureUploadUrl = '/api' + base + '/idCardPictureUpload'
export const admissionTicketUpload = '/api' + base + '/admissionTicketUpload'
export const acceptanceLetterUpload = '/api' + base + '/acceptanceLetterUpload'
//删除证件记录
export const deleteUploadPicture = (id)=>{
    return instance.delete(`${base}/delete/${id}`)
}