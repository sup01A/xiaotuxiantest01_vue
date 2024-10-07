<script setup>

import {ArrowRight,View,Download} from "@element-plus/icons-vue";
import {getClassByStatus} from "@/views/common/common.js";
import {getUploadLoan} from "@/service/student/loanService.js";
import {ref} from "vue";
import DiffDocumentShow from "@/views/common/diffDocumentShow.vue";
import FileDialog from "@/views/common/fileDialog.vue";
import FullPreview from "@/views/common/fullPreview.vue";
//对学费进行格式化
import {formatMoney} from "@/views/common/common.js";
import ViewAndDownload from "@/views/common/viewAndDownload.vue";
const tableData = ref([])
const getUploadLoanData = async ()=>{
  let axiosResponse = await getUploadLoan();
  tableData.value = axiosResponse.data
}
getUploadLoanData()
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

</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/studentHome' }">学生首页</el-breadcrumb-item>
    <el-breadcrumb-item>贷款申请情况</el-breadcrumb-item>
  </el-breadcrumb>
  <hr>
  <div>
    <el-table :data="tableData" border
              style="width: 100%;color: #565959;text-align: center"
              :header-cell-style="{ color: '#000000', textAlign: 'center'}"
              :cell-style="{textAlign: 'center'}"
              highlight-current-row
    >
      <el-table-column type="selection" width="45" />
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
<!--          <div v-if="row.document1 !== null">-->
<!--            <DiffDocumentShow :file-url="row.document1"/>-->
<!--            <el-button-group size="small">-->
<!--              <el-button @click="onOpenFileDialog(row.document1)">-->
<!--                <el-icon><View /></el-icon>-->
<!--              </el-button>-->
<!--              <el-button>-->
<!--                <el-icon><Download /></el-icon>-->
<!--              </el-button>-->
<!--            </el-button-group>-->
<!--          </div>-->
          <ViewAndDownload :file-url="row.document1" @callMyParent="onOpenFileDialog"/>
        </template>
      </el-table-column>
      <el-table-column prop="document2" label="材料二">
        <template #default="{ row }">
<!--          <div v-if="row.document2 !== null">-->
<!--            <DiffDocumentShow :file-url="row.document2"/>-->
<!--            <el-button-group size="small">-->
<!--              <el-button @click="onOpenFileDialog(row.document2)">-->
<!--                <el-icon><View /></el-icon>-->
<!--              </el-button>-->
<!--              <el-button>-->
<!--                <el-icon><Download /></el-icon>-->
<!--              </el-button>-->
<!--            </el-button-group>-->
<!--          </div>-->
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