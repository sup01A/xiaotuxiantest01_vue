<script setup>
import {h, ref} from "vue";
import {CirclePlusFilled} from "@element-plus/icons-vue";
const dialogVisible = ref(false)
//模板引用，父组件触发子组件事件
const open = ()=>{
  dialogVisible.value = true
}
defineExpose({
  open
})
const close = ()=>{
  dialogVisible.value = false
}

//调用父组件的方法
const emits = defineEmits(['on-update']);
//新增框数据模型
const addData = ref({
  deptId: null,
  majorName: null,
  tuition: 0
})
//清空新增框数据模型方法
const clearDddData = ()=>{
  addData.value.deptId = null
  addData.value.majorName = null
  addData.value.tuition = 0
}
//系别信息模型
const dept = defineProps({
  deptData: Array
})
//新增一条专业信息
import {addOneMajorServiceApi} from "@/service/manage/major/majorService.js";
import {ElNotification} from "element-plus";
const addMajor = async ()=>{
  try {
    await addOneMajorServiceApi(addData.value)
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: #626aef;font-size: 18px' }, '新增成功'),
      duration: 1500,
      type: 'success'
    })
    emits('on-update')
  }catch{
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: #626aef;font-size: 18px' }, '新增失败'),
      duration: 1500,
      type: 'warning'
    })
  }
}
</script>
<template>
<el-dialog
    v-model="dialogVisible"
>
  <template #header>
    <div style="color: #626aef;font-size: 24px">
      <el-icon><CirclePlusFilled /></el-icon>
      新增专业信息
    </div>
  </template>
  <el-form>
    <el-form-item label="专业所属系别:">
      <el-select v-model="addData.deptId" placeholder="请选择">
        <el-option
            v-for="item in dept.deptData"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="专业名称:">
      <el-input v-model="addData.majorName"></el-input>
    </el-form-item>
    <el-form-item label="专业所需学费:">
      <el-input :formatter="(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
                v-model="addData.tuition">
      </el-input>
    </el-form-item>
  </el-form>
  <template #footer>
    <div>
      <el-button @click="close(),clearDddData()">取消</el-button>
      <el-button color="#626aef" @click="addMajor(),close(),clearDddData()">确认</el-button>
    </div>
  </template>
</el-dialog>
</template>
<style scoped>
</style>