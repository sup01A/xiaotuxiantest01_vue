<script setup>
import {ref} from "vue";
import {WarningFilled} from "@element-plus/icons-vue";
const dialogVisible = ref(false)
//模板引用，父组件触发子组件事件
const open = ()=>{
  dialogVisible.value = true
}
const close = ()=>{
  dialogVisible.value = false
}
defineExpose({
  open,close
})
//调用父组件方法
const emit = defineEmits(['callMyParent'])
const emitEvent = ()=>{
  emit('callMyParent')
}
</script>

<template>
<el-dialog
    v-model="dialogVisible"
>
  <template #header>
    <div>
      <el-icon style="color: red"><WarningFilled /></el-icon>
      <b>警告</b>
    </div>
  </template>
  <span style="font-size: 18px;color: red">确定要删除该上传记录和已上传的文件吗</span>
  <template #footer>

      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button color="#626aef" @click="emitEvent(),close()">
        确定
      </el-button>
  </template>
</el-dialog>
</template>

<style scoped>

</style>