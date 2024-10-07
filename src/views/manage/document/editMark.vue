<script setup>
import {ref} from "vue";

const dialogVisible = ref(false)
const id = ref(null)
const status = ref(null)
//备注内容
const markContent = ref("")
//清空备注方法
const clearMarkContent = ()=>{
  markContent.value = ""
}
//模板引用，父组件触发子组件事件
const open = (documentId,documentStatus)=>{
  dialogVisible.value = true
  id.value = documentId
  status.value = documentStatus
}
defineExpose({
  open
})
//调用父组件方法
const emit = defineEmits(['callMyParent'])
const emitEvent = ()=>{
  emit('callMyParent',id.value,status.value,markContent.value)
}
//关闭窗体
const close = ()=>{
  dialogVisible.value = false
}
//常用错误快捷输入
const commonMark = (reason)=>{
  markContent.value = markContent.value + reason
}
</script>

<template>
<el-dialog
    v-model="dialogVisible"
    @close="clearMarkContent"
>
  <template #header>
    <div style="color: #626aef;font-size: 24px">
      审核不通过备注
    </div>
  </template>
  <el-input
      v-model="markContent"
      maxlength="100"
      show-word-limit
      type="textarea"
  />
  <el-button-group size="small">
    <el-button @click="commonMark('证件类型错误')">“证件类型错误”</el-button>
    <el-button @click="commonMark('证件照太模糊')">“证件照太模糊”</el-button>
  </el-button-group>
  <template #footer>
    <div>
      <el-button @click="close(),clearMarkContent()">取消</el-button>
      <el-button color="#626aef" @click="emitEvent(),clearMarkContent(),close()">确认</el-button>
    </div>
  </template>
</el-dialog>
</template>

<style scoped>

</style>