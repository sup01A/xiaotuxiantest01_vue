<script setup>
import {ArrowRight} from "@element-plus/icons-vue";
import {getUploadPicture} from "@/service/student/documentService.js";
import {h, ref} from "vue";
const tableData = ref([])

const getUploadPictureData = async ()=>{
  let axiosResponse = await getUploadPicture();
  tableData.value = axiosResponse.data
}
getUploadPictureData()
//根据照片不同状态改变不同样式
import {getClassByStatus} from "@/views/common/common.js";
//引入图片点击
import {useHandleClick} from "@/views/common/common.js";
const { dialogUrl,dialogVisible,handleClick } = useHandleClick();
//删除证件记录
import {deleteUploadPicture} from "@/service/student/documentService.js";
import {ElNotification} from "element-plus";
const deleteUploadPicEvent = async (id)=>{
  let axiosResponse = await deleteUploadPicture(id);
  if (axiosResponse.data === true){
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: green;font-size: 18px' }, '删除成功'),
      duration: 2000,
      type: 'success'
    })
    //删除成功重新获取数据
    await getUploadPictureData()
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
    <el-breadcrumb-item :to="{ path: '/studentHome' }">学生首页</el-breadcrumb-item>
    <el-breadcrumb-item>证件查看</el-breadcrumb-item>
  </el-breadcrumb>
  <hr>
  <!--  表格-->
  <div>
    <el-table :data="tableData" border
              style="width: 100%;color: #565959;text-align: center"
              :header-cell-style="{ color: '#000000', textAlign: 'center'}"
              :cell-style="{textAlign: 'center'}"
    >
      <el-table-column type="selection" width="45" />
      <el-table-column prop="url" label="照片">
        <template #default="{ row }">
          <el-tooltip content='点击放大'>
            <el-image :src="row.url"
                      style="width: 100px;cursor: pointer"
                      @click="handleClick(row.url)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="证件类型" />
      <el-table-column prop="uploadDate" label="上传日期" />
      <el-table-column prop="status" label="是否已审核">
        <template #default="{ row }">
          <span :class="getClassByStatus(row.status)">{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mark" label="备注" />
      <el-table-column label="操作" width="150" >
        <template #default="{ row }">
          <el-button type="danger" v-if="row.status !== '审核通过'" @click="deleteUploadPicEvent(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
<!--    图片放大框-->
    <el-dialog v-model="dialogVisible" style="width: 80%;margin-top: 5vh">
      <img style="width: 100%" :src="dialogUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style scoped>

</style>