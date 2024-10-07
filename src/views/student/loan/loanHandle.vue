<script setup>
import {ArrowRight} from "@element-plus/icons-vue";
import {h, ref} from "vue";
// 贷款类型数据模型
const loadType = ref([
    '生源地信用助学贷款',
  '校园地国家助学贷款',
  '教育贷款',
  '小额贷款',
  '创业贷款'
])
const loanForm = ref({})
//清空数据方法
const clearLoanForm = ()=>{
  loanForm.value = {}
}
const handleChange1 = (file)=>{
  loanForm.value.document1 = file.raw
}
const handleRemove1 = ()=>{
  loanForm.value.document1 = null
}
const handleChange2 = (file)=>{
  loanForm.value.document2 = file.raw
}
const handleRemove2 = ()=>{
  loanForm.value.document2 = null
}
const uploadRef1 = ref(null)
const uploadRef2 = ref(null)
//清空数据方法
const clearUploadFiles = ()=>{
  uploadRef1.value.clearFiles()
  uploadRef2.value.clearFiles()
}
const loanFormRef = ref(null)
const loanFormRule = {
  loanType:[
    {required: true,message: '请选择贷款类型',trigger: 'blur'},
  ],
  amount:[
    {required: true,message: '请填写贷款金额',trigger: 'blur'},
    { validator: (rule, value, callback) => {
        // 检查值是否为空
        if (value === '') {
          callback(new Error('贷款金额不能为空'));
        } else {
          // 使用正则表达式检查是否为整数
          const regex = /^-?\d+$/;
          if (regex.test(value)) {
            callback();
          } else {
            callback(new Error('贷款金额必须是整数'));
          }
        }
      }, trigger: 'blur' }
  ],
  mark:[
    {required: true,message: '请选择贷款陈述',trigger: 'blur'},
  ],
  document1:[
    {required: true,message: '请选择文件',trigger: 'blur'},
  ],
}
import {uploadLoanServiceApi} from "@/service/student/loanService.js";
import {ElMessage, ElNotification} from "element-plus";
const uploadData = async ()=>{
  ElNotification({
    title: '提示',
    message: h('b', { style: 'color: green;font-size: 18px' }, '正在提交和上传文件，请等待'),
    duration: 2000,
    type: 'success'
  })
  let axiosResponse = await uploadLoanServiceApi(loanForm.value);
  if (axiosResponse.data === true){
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: green;font-size: 18px' }, '提交成功'),
      duration: 3000,
      type: 'success'
    })
    clearLoanForm()
    clearUploadFiles()
  }else {
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: #ff3300;font-size: 18px' }, '提交失败'),
      duration: 3000,
      type: 'warning'
    })
  }
}
const submitForm = ()=>{
  loanFormRef.value.validate((valid) =>{
    if (valid){
      uploadData()
    }else {
      ElMessage.error("信息填写有错误")
    }
  })
}
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/studentHome' }">学生首页</el-breadcrumb-item>
    <el-breadcrumb-item>贷款办理</el-breadcrumb-item>
  </el-breadcrumb>
  <hr>
  <div style="margin-left: 10px">
  <el-form ref="loanFormRef" :model="loanForm" :rules="loanFormRule">
    <el-form-item label="贷款类型:" style="width: 60%" prop="loanType">
      <el-select v-model="loanForm.loanType">
        <el-option v-for="item in loadType" :value="item">{{item}}</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="贷款金额:" style="width: 60%" prop="amount">
      <el-input :formatter="(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
                v-model="loanForm.amount"
                >
      </el-input>
    </el-form-item>
    <el-form-item label="申请陈述:" style="width: 60%" prop="mark">
      <el-input
          type="textarea"
          :maxlength="500"
          show-word-limit
          :autosize="{ minRows: 5}"
          v-model="loanForm.mark"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="申请表1上传(必须):" style="width: 60%" prop="document1">


          <el-upload
              ref="uploadRef1"
              :limit="1"
              :auto-upload="false"
              style="width: 100%"
              accept=".docx,.pdf"
              :on-change="handleChange1"
              :on-remove="handleRemove1"
          >
            <el-popover
                placement="top"
                trigger="hover"
                content="支持格式(docx,pdf)"
            >
              <template #reference>
            <el-button color="#626aef">选择文件</el-button>
              </template>
            </el-popover>
          </el-upload>

    </el-form-item>
    <el-form-item label="申请表2上传(非必须):" style="width: 60%">
      <el-upload
          ref="uploadRef2"
          :limit="1"
          :auto-upload="false"
          style="width: 100%"
          accept=".docx,.pdf"
          :on-change="handleChange2"
          :on-remove="handleRemove2"
      >
        <el-popover
            placement="bottom"
            trigger="hover"
            content="支持格式(docx,pdf)"
        >
          <template #reference>
            <el-button color="#626aef">选择文件</el-button>
          </template>
        </el-popover>
      </el-upload>
    </el-form-item>
    <el-form-item style="width: 60%">
        <el-button color="#626aef" @click="submitForm()" size="large" style="margin-left: auto">提交</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<style scoped>

</style>