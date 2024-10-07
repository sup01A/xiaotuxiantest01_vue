<script setup>
import {h, ref} from "vue";
import {ElMessage, ElNotification} from "element-plus";
const roleData = ref([])
import {roleServiceApi} from "@/service/role/roleService.js";
const getRoleData = async ()=>{
  let axiosResponse = await roleServiceApi();
  roleData.value = axiosResponse.data

}
getRoleData()
const loginFormData = ref({
  account: '',
  password: '',
  roleId: null,
  accept: false
})
const clearLoginFormData = ()=>{
  loginFormData.value.account = ''
  loginFormData.value.password = ''
  loginFormData.value.roleId = null
  loginFormData.value.accept = false
}
const loginForm = ref(null)

const loginFormDataRule = {
  account:[
    {required: true,message: '请输入用户名',trigger: 'blur'},
    // {min: 5,max: 16,message: '5-16个字符' ,trigger: 'blur'}
  ],
  password:[
    {required: true,message: '请输入密码',trigger: 'blur'},
    // {min: 5,max: 16,message: '5-16个字符' ,trigger: 'blur'}
  ],
  roleId:[
    {required: true,message: '请选择角色',trigger: 'blur'},
  ],
  accept:[
    {
      validator: (rule, value, callback) => {
        if (value !== true) {
          callback(new Error('请勾选同意协议'));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }
  ]
}
import {userRoleInfoStore} from "@/store/userRole.js";
import {useTokenStore} from "@/store/userJwtToken.js";
const roleInfoStore = userRoleInfoStore();
const tokenStore = useTokenStore()
import {userLoginServiceApi} from "@/service/user/userService.js";
import {router} from "@/route/index.js";
const userLogin = async ()=>{
  let axiosResponse = await userLoginServiceApi(loginFormData.value);
  if (axiosResponse.data.success === true){
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: green;font-size: 18px' }, axiosResponse.data.msg),
      duration: 2000,
      type: 'success'
    })
    roleInfoStore.setRoleId(loginFormData.value.roleId)
    tokenStore.setToken(axiosResponse.data.data)
    if (loginFormData.value.roleId === 0){
      await router.push('/adminHome')
    }
    if (loginFormData.value.roleId === 1){
      await router.push('/manageHome')
    }
    if (loginFormData.value.roleId === 2){
      await router.push('/financeHome')
    }
    if (loginFormData.value.roleId === 3){
      await router.push('/dormitoryHome')
    }
    if (loginFormData.value.roleId === 4){
      await router.push('/secretaryHome')
    }
    if (loginFormData.value.roleId === 5){
      await router.push("/studentHome")
    }
  }else {
    ElNotification({
      title: '提示',
      message: h('b', { style: 'color: #ff3300;font-size: 18px' }, axiosResponse.data.msg),
      duration: 2000,
      type: 'warning'
    })
  }
}

const submitForm = ()=>{
  loginForm.value.validate((valid) =>{
    if (valid){
      userLogin()
    }else {
      ElMessage.error("登录信息有误")
    }
  })
}
</script>
<template>
  <div class="login-container">
    <img src="@/assets/logo3.png" alt="logo" width="460px">
    <h2 style="text-align: center">新生报到系统登录入口</h2>
    <el-form ref="loginForm" :model="loginFormData" label-width="100px" :rules="loginFormDataRule">
      <el-form-item label="用户名:" prop="account">
        <el-input v-model="loginFormData.account" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="loginFormData.password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="roleId">
        <el-select v-model="loginFormData.roleId" placeholder="请选择角色">
          <el-option v-for="item in roleData" :key="item.roleId" :label="item.roleName" :value="item.roleId"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="accept">
        <el-checkbox v-model="loginFormData.accept" size="large" :validate-event="true"/>
        &nbsp我已阅读并同意&nbsp
        <el-link type="primary">《广软学生手册》</el-link>
        &nbsp和&nbsp
        <el-link type="primary">《规定》</el-link>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="clearLoginFormData">取消</el-button>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.login-container {
  width: 460px;
  margin: 100px auto;
}
</style>