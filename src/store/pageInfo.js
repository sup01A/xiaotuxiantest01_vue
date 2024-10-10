import {defineStore} from "pinia";
import {ref} from "vue";
export const useMajorPageInfoStore = defineStore('majorPageInfo',()=>{
    const paginationData = ref({
        currentPageNum: 1,
        pageSize: 10
    })
    return{
        paginationData
    }
}
)
export const useDocumentPhotoPageInfoStore = defineStore('documentPhotoPageInfo',()=>{
        const paginationData = ref({
            currentPageNum: 1,
            pageSize: 5,
            account: null,
            typeName: null,
            status: null,
        })
    const resetPaginationData = ()=>{
            paginationData.value.currentPageNum = 1
            paginationData.value.pageSize = 5
            paginationData.value.account = null
            paginationData.value.typeName = null
            paginationData.value.status = null
    }
        return{
            paginationData,resetPaginationData
        }
    }
)