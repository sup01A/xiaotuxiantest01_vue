import {ref} from "vue";
//根据照片不同状态改变不同样式
export const getClassByStatus = (data)=>{
    return{
        'status-0': data === '未审核',
        'status-1': data === '审核通过',
        'status-2': data === '审核未通过'
    }
}
//贷款的类型
export const allLoanType = [
    '生源地信用助学贷款',
    '校园地国家助学贷款',
    '教育贷款',
    '小额贷款',
    '创业贷款'
]
//状态
export const allStatus = [
    '未审核',
    '审核通过',
    '审核未通过'
]
//所有证件类型
export const allDocumentType = [
    '身份证',
    '录取通知书',
    '高考准考证'
]
//用于el-table金钱展示进行格式化
export const formatMoney = (row, column, cellValue, index)=>{
    return `￥ ${cellValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// 图片点击 (文档点击也适用)
export const useHandleClick = () => {
    const dialogUrl = ref("")
    const dialogVisible = ref(false)
    const handleClick = (url)=>{
        dialogUrl.value = url
        dialogVisible.value = true
    }
    return{
        dialogUrl,dialogVisible,handleClick
    }
};