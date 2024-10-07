import {defineStore} from "pinia";
import {ref} from "vue";
export const userPageInfoStore = defineStore('pageInfo',()=>{
    const paginationData = ref({
        currentPageNum: 1,
        pageSize: 10
    })
    return{
        paginationData
    }
}
)