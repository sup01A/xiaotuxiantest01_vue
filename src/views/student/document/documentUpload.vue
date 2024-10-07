<script setup>
import {ArrowRight} from '@element-plus/icons-vue'
import UploadTest from "@/views/common/uploadTest.vue";
import {idCardPictureUploadUrl,admissionTicketUpload,acceptanceLetterUpload} from '@/service/student/documentService.js'
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/studentHome' }">学生首页</el-breadcrumb-item>
    <el-breadcrumb-item>证件上传</el-breadcrumb-item>
  </el-breadcrumb>
  <hr>
  <div class="document_upload">
    <span>身份证上传</span>
    <div class="upload_square">
      <UploadTest :action-url="idCardPictureUploadUrl"/>
    </div>
  </div>
  <div class="document_upload">
    <span >高考准考证上传</span>
    <div class="upload_square">
      <UploadTest :action-url="admissionTicketUpload"/>
    </div>
  </div>
  <div class="document_upload">
    <span>录取通知书上传</span>
    <div class="upload_square">
      <UploadTest :action-url="acceptanceLetterUpload"/>
    </div>
  </div>
</template>

<style scoped>
.document_upload {
  border-radius: 18px;
  border: 2px solid #404040;
  margin: 10px;
  width: auto;
  display: inline-block;
  overflow: hidden;
}
.document_upload span{
  display: inline-block;
  width: 100%;
  text-align: center;
  color: white;
  background-color: #404040;;
}
.document_upload .upload_square{
  margin: 10px;
}
</style>