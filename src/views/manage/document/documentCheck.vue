<script setup>

import {ArrowRight} from "@element-plus/icons-vue";
import {h, ref} from "vue";
//导入全部证件类型
import {allDocumentType} from "@/views/common/common.js";
//导入所有审核状态
import {allStatus} from "@/views/common/common.js";
const tableData = ref([])
//根据照片不同状态改变不同样式
import {getClassByStatus} from "@/views/common/common.js";
//引入图片点击
import {useHandleClick} from "@/views/common/common.js";
const { dialogUrl,dialogVisible,handleClick } = useHandleClick();

// //清空方法
// const resetSearchDataModel = ()=>{
//   searchDataModel.value = {}
// }
import {getByConditionServiceApi} from "@/service/manage/document/documentCheck.js";
// //根据搜索条件获取数据
// const getSearchResult = async ()=>{
//   let axiosResponse = await getByConditionServiceApi(searchDataModel.value);
//   tableData.value = axiosResponse.data
// }
//分页数据模型，使用pinia存用户的翻页数据，
//解决了用户翻页后切换不同导航栏后再切回来
//页数会重新回到首页，存着翻页数据就不会了
import {useDocumentPhotoPageInfoStore} from "@/store/pageInfo.js";
const pageInfoStore = useDocumentPhotoPageInfoStore()
const {paginationData} = storeToRefs(pageInfoStore)

// //搜索相关
// const searchDataModel = ref({
//   currentPageNum : paginationData.value.currentPageNum,
//   pageSize : paginationData.value.pageSize
// })

//分页条件获取所有证件记录的信息的总条数
const documentPhotoTotal = ref(0)
//分页根据搜索条件获取数据
import {getPageByConditionServiceApi} from "@/service/manage/document/documentCheck.js";
const getPageSearchResult = async ()=>{
  let axiosResponse = await getPageByConditionServiceApi(paginationData.value);
  tableData.value = axiosResponse.data.records
  documentPhotoTotal.value = axiosResponse.data.total
}
getPageSearchResult()
const handleSizeChange = ()=>{
  getPageSearchResult()
}
//打开子组件编辑框弹窗
const markRef = ref(null)
const onMark = (documentId,documentStatus)=>{
  markRef.value.open(documentId,documentStatus)
}
//更新证件状态
import {updateStatus} from "@/service/manage/document/documentCheck.js";
import {ElNotification} from "element-plus";
import EditMark from "@/views/manage/document/editMark.vue";
const updateButtonEvent = async (documentId,documentStatus,markContent)=>{
  const data = {
    id: documentId,
    status: documentStatus,
    mark: markContent
  }
  let axiosResponse = await updateStatus(data);
  if (axiosResponse.data === true){
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: green;font-size: 18px' }, '成功'),
      duration: 2000,
      type: 'success'
    })
    // await getSearchResult()
    //分页
    await getPageSearchResult()
  }else {
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: #ff3300;font-size: 18px' }, '失败'),
      duration: 2000,
      type: 'warning'
    })
  }

}
//打开子组件删除框弹窗
import DeleteConfirm from "@/views/common/deleteConfirm.vue";
const deleteRef = ref(null)
const onDelete = ()=>{
  deleteRef.value.open()
}
//删除传参模型
const deleteDataModel = ref({})
import {deleteUploadPicture} from "@/service/manage/document/documentCheck.js";
import {storeToRefs} from "pinia";
const deleteUploadPicEvent = async ()=>{
  let axiosResponse = await deleteUploadPicture(deleteDataModel.value);
  if (axiosResponse.data === true){
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: green;font-size: 18px' }, '删除成功'),
      duration: 2000,
      type: 'success'
    })
    //删除成功重新获取数据
    // await getSearchResult()
    //分页
    await getPageSearchResult()
  }else {
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: #ff3300;font-size: 18px' }, '删除失败'),
      duration: 2000,
      type: 'warning'
    })
  }
}
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/manageHome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>证件审核</el-breadcrumb-item>
  </el-breadcrumb>
  <hr>
  <!--    头部下面的条件搜索表单-->
  <el-form :inline="true" v-model="paginationData">
    <el-form-item label="用户名:">
      <el-input
          v-model="paginationData.account"
          style="width: 150px"
          clearable
      >
      </el-input>
    </el-form-item>
    <el-form-item label="证件类型:">
      <el-select
          placeholder="请选择"
          clearable
          style="width: 130px"
          v-model="paginationData.typeName"
      >
        <el-option v-for="item in allDocumentType" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="审核状态:">
      <el-select
          placeholder="请选择"
          clearable
          style="width: 130px"
          v-model="paginationData.status"
      >
        <el-option v-for="item in allStatus" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button color="#626aef" @click="getPageSearchResult">搜索</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="pageInfoStore.resetPaginationData(),getPageSearchResult()">重置</el-button>
    </el-form-item>
  </el-form>
  <!--  表格-->
  <div>
    <el-table :data="tableData" border
              style="width: 100%;color: #565959;text-align: center"
              :header-cell-style="{ color: '#000000', textAlign: 'center'}"
              :cell-style="{textAlign: 'center'}"
    >
      <el-table-column type="selection" width="45" />
      <el-table-column prop="account" label="用户名" />
      <el-table-column prop="url" label="照片">
        <template #default="{ row }">
          <el-tooltip content='点击放大'>
            <el-image :src="row.url"
                      style="width: 100px"
                      @click="handleClick(row.url)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="证件类型" />
      <el-table-column prop="uploadDate" label="上传日期" />
      <el-table-column prop="status" label="审核状态">
        <template #default="{ row }">
          <span :class="getClassByStatus(row.status)">{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mark" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button-group size="small">
            <el-tooltip
                content="通过并删除备注"
            >
              <el-button type="success" v-if="row.status === '审核未通过' || row.status === '未审核'" @click="updateButtonEvent(row.id,'审核通过','')">通过</el-button>
            </el-tooltip>
            <el-button type="warning" v-if="row.status === '审核通过' || row.status === '未审核'" @click="onMark(row.id,'审核未通过')">不通过</el-button>
            <el-button type="danger" @click="onDelete(),deleteDataModel.id = row.id,deleteDataModel.userId = row.userId,deleteDataModel.url = row.url">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!--  分页条-->
    <div style="display: flex;justify-content: flex-end;padding: 10px">
      <el-pagination
          v-model:current-page="paginationData.currentPageNum"
          v-model:page-size="paginationData.pageSize"
          :page-sizes="[1, 2, 3, 30]"
          layout="total, prev, pager, next, jumper, sizes"
          :total="documentPhotoTotal"
          @change="handleSizeChange"
          background
      />
    </div>
    <!--    图片放大框-->
    <el-dialog v-model="dialogVisible" style="width: 80%;margin-top: 5vh">
      <img style="width: 100%" :src="dialogUrl" alt="Preview Image" />
    </el-dialog>
    <!--    备注框-->
    <EditMark ref="markRef" @callMyParent="updateButtonEvent"/>
    <!--    确认删除弹窗-->
    <delete-confirm ref="deleteRef" @callMyParent="deleteUploadPicEvent"/>
  </div>
</template>

<style scoped>

</style>