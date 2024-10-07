<script setup>
import {Plus, EditPen, Close, ArrowRight} from '@element-plus/icons-vue'
import {onBeforeMount, onMounted, ref} from "vue";
// 表单数据模型
const tableData = ref(null)
import {majorPageWithDeptServiceApi} from "@/service/manage/major/majorService.js";
//采用分页获取后废弃
// const getTableData = async ()=>{
//   let axiosResponse = await majorWithDeptServiceApi();
//   tableData.value = axiosResponse.data
// }
//调用方法获得数据

//分页数据模型，使用pinia存用户的翻页数据，
//解决了用户翻页后切换不同导航栏后再切回来
//页数会重新回到首页，存着翻页数据就不会了
import {userPageInfoStore} from "@/store/pageInfo.js";
const pageInfoStore = userPageInfoStore()
const {paginationData} = storeToRefs(pageInfoStore)
//分页获取所有专业带系别属性的信息的总条数
const majorPageWithDeptTotal = ref(0)
//分页获取数据
const getMajorPageWithDept = async ()=>{
  let axiosResponse = await majorPageWithDeptServiceApi(paginationData.value);
  tableData.value = axiosResponse.data.records
  majorPageWithDeptTotal.value = axiosResponse.data.total
}
getMajorPageWithDept()
const handleSizeChange = ()=>{
  getMajorPageWithDept()
}
//对学费进行格式化
import {formatMoney} from "@/views/common/common.js";
//系别数据模型
const deptData = ref(null)
//获取所有系别信息
import {deptServiceApi} from "@/service/dept/deptService.js"
const getDeptData = async ()=>{
  let axiosResponse = await deptServiceApi();
  deptData.value = axiosResponse.data
  // console.log(deptData.value)
}
getDeptData()
// 导入编辑框
import editMajor from '@/views/manage/major/editMajor.vue'
//打开子组件编辑框弹窗
const editRef = ref(null)
const onEdit = (row)=>{
  editRef.value.open(row)
}
// 导入新增框
import addMajor from '@/views/manage/major/addMajor.vue'
import {storeToRefs} from "pinia";
//打开子组件新增框弹窗
const addRef = ref(null)
const onAdd = ()=>{
  addRef.value.open()
}
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/manageHome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>专业管理</el-breadcrumb-item>
  </el-breadcrumb>
  <hr>
<!--  新增按钮-->
  <div>
    <el-button color="#626aef" @click="onAdd">
      <el-icon><Plus /></el-icon>新增
    </el-button>
  </div>
<!--  表格-->
  <div>
    <el-table :data="tableData" border
              style="width: 100%;color: #565959"
              :header-cell-style="{ color: '#000000' }">
      <el-table-column label="序号" width="80">
        <template #default="{ $index }">
          <el-button color="#626aef" disabled>{{ $index + 1 }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="majorId" label="专业ID" width="100" />
      <el-table-column prop="majorName" label="专业名称" />
      <el-table-column prop="tuition" label="专业学费" width="100"  :formatter="formatMoney"/>
      <el-table-column prop="deptId" label="系别ID" width="100" />
      <el-table-column prop="dept.deptName" label="系别名称" />
      <el-table-column label="操作" width="200" >
        <template #default="{ row }">
          <el-button type="success" @click="onEdit(row)">
            <el-icon><EditPen /></el-icon>编辑
          </el-button>
          <el-button type="danger">
            <el-icon><Close /></el-icon>删除
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

  </div>
<!--  分页条-->
  <div style="display: flex;justify-content: flex-end;padding-top: 10px;padding-right: 5px">
    <el-pagination
        v-model:current-page="paginationData.currentPageNum"
        v-model:page-size="paginationData.pageSize"
        :page-sizes="[10, 15, 20, 30]"
        layout="total, prev, pager, next, jumper, sizes"
        :total="majorPageWithDeptTotal"
        @change="handleSizeChange"
        class="custom-pagination"
        background
    />
  </div>
<!--  编辑框子组件-->
  <edit-major ref="editRef" :deptData="deptData" @on-update="getMajorPageWithDept"/>
<!--  新增框子组件-->
  <add-major ref="addRef" :deptData="deptData" @on-update="getMajorPageWithDept"/>
</template>
<style scoped>
</style>