<script setup>
defineProps({
  actionUrl:{
    type: String
  }
})
import {h, ref} from "vue";
import {ElMessage, ElNotification} from "element-plus";
import {useTokenStore} from "@/store/userJwtToken.js";
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const uploadRef = ref(null)
//放大图片
const handlePictureCardPreview = (uploadFile)=>{
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
//选择超过两个
const handleExceed = (files, _fileList) => {
  ElMessage.warning(`当前限制选择不超过 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + _fileList.length} 个文件`);
};
//处理过程
const handleProgress = () => {
  ElNotification({
    title: '提示',
    message: h('b', { style: 'color: green;font-size: 18px' }, "正在上传，请等待图片全部显示"),
    duration: 2500,
    type: 'success'
  })
};
//上传失败
const handleError = (err)=>{
  console.log("自定义错误处理")
  console.log(err)
  ElNotification({
    title: '提示',
    message: h('b', { style: 'color: red;font-size: 18px' }, err.message),
    duration: 3500,
    type: 'warning'
  })
}
//获取用户的jwtToken
const tokenStore = useTokenStore()
//成功上传
const handleSuccess = (result)=>{
  ElNotification({
    title: '提示',
    message: h('b', { style: 'color: green;font-size: 18px' }, "已成功上传一张"),
    duration: 2500,
    type: 'success'
  })
}
// 确认上传
const submitUpload = ()=>{
  uploadRef.value.submit()
}
</script>

<template>
<el-upload
    ref="uploadRef"
    accept="image/png, image/jpg, image/jpeg"
    :action="actionUrl"
    multiple
    list-type="picture-card"
    :auto-upload="false"
    :limit="2"
    :headers="{'Authorization':tokenStore.token}"
    :on-preview="handlePictureCardPreview"
    :on-progress="handleProgress"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
>
  <el-button >选择照片</el-button>
  <template #tip>
    <div style="color: red">
      限制 2 张图片，单张最大 2 MB
    </div>
  </template>
</el-upload>
  <div style="display: flex;justify-content: end">
    <el-button type="success" @click="submitUpload">提交</el-button>
  </div>
  <!--    图片放大框-->
  <el-dialog v-model="dialogVisible" style="width: 80%;margin-top: 5vh">
      <img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped>

</style>