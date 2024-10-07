<script setup>
import VueOfficePdf from "@vue-office/pdf";
import VueOfficeDocx from "@vue-office/docx";
import {computed, ref} from "vue";
const fileUrl = ref("");
const fileName = computed(() => {
  const s = fileUrl.value.toString()
  return s.substring(s.indexOf('=') + 1)
});
const fileType = computed(() => {
  const name = fileName.value;
  name.indexOf('=')
  return name.substring(name.lastIndexOf('.') + 1);
});
const dialogVisible = ref(false)
//模板引用，父组件触发子组件事件
const open = (data)=>{
  dialogVisible.value = true
  fileUrl.value = data
  console.log("fileName： " + fileName.value + "      fileType:  " + fileType.value)
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" style="width: 80%;margin-top: 5vh">
    <div style="margin-left: auto;margin-right: auto;width: 100%">
      <vue-office-docx v-if="fileType === 'docx' " :src="fileUrl"/>
      <vue-office-pdf v-if="fileType === 'pdf' " :src="fileUrl"/>
    </div>
  </el-dialog>
</template>

<style scoped>

</style>