<script setup>

import {ArrowRight, Download, View} from "@element-plus/icons-vue";
import {ref} from "vue";
import {allLoanType, formatMoney, getClassByStatus,allStatus} from "@/views/common/common.js";
import DiffDocumentShow from "@/views/common/diffDocumentShow.vue";
import FileDialog from "@/views/common/fileDialog.vue";
import FullPreview from "@/views/common/fullPreview.vue";
//搜索相关
const searchDataModel = ref({
})
//清空方法
const resetSearchDataModel = ()=>{
  searchDataModel.value = {}
}
const tableData = ref([])
//文档文件预览弹窗
const fileDialogRef = ref(null)
const onOpenFileDialog = (data)=>{
  fileDialogRef.value.open(data)
}
//贷款记录整体预览抽屉
const fullPreviewRef = ref(null)
const onOpenFullPreview = (data)=>{
  fullPreviewRef.value.open(data)
}
import {getByConditionServiceApi} from "@/service/manage/loan/loanCheck.js";
//根据搜索条件获取数据
const getSearchResult = async ()=>{
  let axiosResponse = await getByConditionServiceApi(searchDataModel.value);
  tableData.value = axiosResponse.data
}
//导入预览和下载按钮组
import ViewAndDownload from "@/views/common/viewAndDownload.vue";
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/manageHome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>学生贷款审核</el-breadcrumb-item>
  </el-breadcrumb>
  <hr>
  <!--    头部下面的条件搜索表单-->
  <el-form :inline="true" v-model="searchDataModel">
    <el-form-item label="用户名:">
      <el-input
          v-model="searchDataModel.account"
          style="width: 150px"
          clearable
      >
      </el-input>
    </el-form-item>
    <el-form-item label="贷款类型:">
      <el-select
          placeholder="请选择"
          clearable
          style="width: 180px"
          v-model="searchDataModel.loanType"
      >
        <el-option v-for="item in allLoanType" :label="item" :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="审核状态:">
      <el-select
          placeholder="请选择"
          clearable
          style="width: 130px"
          v-model="searchDataModel.status"
      >
        <el-option v-for="item in allStatus" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button color="#626aef" @click="getSearchResult">搜索</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetSearchDataModel">重置</el-button>
    </el-form-item>
  </el-form>
<!--  表格展示区-->
  <div>
    <el-table :data="tableData" border
              style="width: 100%;color: #565959;text-align: center"
              :header-cell-style="{ color: '#000000', textAlign: 'center'}"
              :cell-style="{textAlign: 'center'}"
              highlight-current-row
    >
      <el-table-column type="selection" width="45" />
      <el-table-column prop="account" label="用户名"  />
      <el-table-column prop="loanType" label="贷款类型"  />
      <el-table-column prop="amount" label="贷款金额" :formatter="formatMoney" />
      <el-table-column prop="uploadDate" label="提交日期" />
      <el-table-column prop="mark" label="贷款陈述" >
        <template #default="{ row }">
          <el-input
              v-model="row.mark"
              type="textarea"
              disabled
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="document1" label="材料一">
        <template #default="{ row }">
          <ViewAndDownload :file-url="row.document1" @callMyParent="onOpenFileDialog"/>
        </template>
      </el-table-column>
      <el-table-column prop="document2" label="材料二">
        <template #default="{ row }">
          <ViewAndDownload :file-url="row.document2" @callMyParent="onOpenFileDialog"/>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template #default="{ row }">
          <span :class="getClassByStatus(row.status)">{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" >
        <template #default="{ row }">
          <el-button-group size="small">
            <el-button type="danger" v-if="row.status !== '审核通过'">删除
            </el-button>
            <el-button @click="onOpenFullPreview(row)">整体预览</el-button>
          </el-button-group>

        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </div>
  <!--  文档文件预览弹窗-->
  <FileDialog ref="fileDialogRef"/>
  <!--  贷款记录整体预览抽屉-->
  <FullPreview ref="fullPreviewRef" @callMyParent="onOpenFileDialog"/>
</template>

<style scoped>

</style>