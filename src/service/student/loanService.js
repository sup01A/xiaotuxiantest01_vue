import {instance} from "@/service/request.js";
const base = '/student/loan'
export const uploadLoanServiceApi = (data)=>{
    const formData = new FormData();
    formData.append('loanType',data.loanType);
    formData.append('amount',data.amount);
    formData.append('mark',data.mark);
    formData.append('document1',data.document1);
    formData.append('document2',data.document2);
    return instance.post(base + '/upload',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export const getUploadLoan = ()=>{
    return instance.get( base + '/getUpload')
}