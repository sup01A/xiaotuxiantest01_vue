<script setup>
import {h, ref} from "vue";
import {EditPen} from '@element-plus/icons-vue'
import {ElNotification} from "element-plus";
const dialogVisible = ref(false)
//编辑框数据模型
const editData = ref({
  majorId: null,
  deptId: null,
  majorName: null,
  tuition: null
})
//系别信息模型
const dept = defineProps({
  deptData: Array
})
//模板引用，父组件触发子组件事件
const open = (row)=>{
  dialogVisible.value = true
  editData.value.majorId = row.majorId
  editData.value.deptId = row.deptId
  editData.value.majorName = row.majorName
  editData.value.tuition = row.tuition
}
//
defineExpose({
  open,
})
//调用父组件的方法
const emits = defineEmits(['on-update']);
//更新一条专业信息
import {updateOneMajorServiceApi} from "@/service/major/majorService.js";
const editUpdate = async ()=>{
  try {
    await updateOneMajorServiceApi(editData.value);
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: #626aef;font-size: 18px' }, '修改成功'),
      duration: 1500,
      type: 'success'
    })
  }catch{
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: #626aef;font-size: 18px' }, '修改失败'),
      duration: 1500,
      type: 'warning'
    })
  }
  // 修改后完后通知父组件更新列表信息
  emits('on-update')
  dialogVisible.value = false
}
</script>

<template>
<el-dialog
    v-model="dialogVisible"
>
  <template #header>
    <div style="color: #626aef;font-size: 24px">
      <el-icon><EditPen/></el-icon>
      编辑专业信息
    </div>
  </template>
<el-form :model="editData">
  <el-form-item label="所属系别名称:">
    <el-select v-model="editData.deptId">
      <el-option
          v-for="item in dept.deptData"
          :key="item.deptId"
          :label="item.deptName"
          :value="item.deptId"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="专业名称:">
    <el-input v-model="editData.majorName"></el-input>
  </el-form-item>
  <el-form-item label="专业所需学费:">
    <el-input :formatter="(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
              :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
              v-model="editData.tuition">
    </el-input>
  </el-form-item>
</el-form>
  <template #footer>
    <div>
      <el-button @click="dialogVisible = false">不修改</el-button>
      <el-button color="#626aef" @click="editUpdate">修改</el-button>
    </div>
  </template>
</el-dialog>
</template>
<style scoped>
</style>