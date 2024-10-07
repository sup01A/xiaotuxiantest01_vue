<script setup>
import {
  Menu as IconMenu,
  Avatar,
  Edit,
  Connection
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import Header from "@/views/header.vue";
import Logo from "@/views/logo.vue";
</script>

<template>
  <div>
    <el-container>
      <!--    左边菜单栏-->
      <el-aside style="max-width: 180px">
        <el-menu
            background-color="black"
            class="el-menu-vertical-demo"
            text-color="white"
            router
            :default-active="$route.path"
            unique-opened
        >
          <Logo/>
          <el-menu-item index="/manageHome">
            <el-icon><icon-menu /></el-icon>
            <span>后台首页</span>
          </el-menu-item>
          <el-menu-item index="#">
            <el-icon><Edit /></el-icon>
            <span>系别管理</span>
          </el-menu-item>
          <el-menu-item index="/manageHome/majorManage">
            <el-icon><Edit /></el-icon>
            <span>专业管理</span>
          </el-menu-item>
          <el-menu-item index="#">
            <el-icon><Edit /></el-icon>
            <span>班级管理</span>
          </el-menu-item>
          <el-menu-item index="#">
            <el-icon><Connection /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/manageHome/documentCheck">
            <el-icon><Connection /></el-icon>
            <span>新生证件审核</span>
          </el-menu-item>
          <el-menu-item index="/manageHome/loanCheck">
            <el-icon><Connection /></el-icon>
            <span>学生贷款审核</span>
          </el-menu-item>
          <el-sub-menu index="#">
              <template #title>
                <el-icon><Avatar /></el-icon>
                <span>个人中心</span>
              </template>
            <div class="sub">
              <el-menu-item index="/user/info">基本资料</el-menu-item>
              <el-menu-item index="/user/avatar">更换头像</el-menu-item>
              <el-menu-item index="/user/resetpassword">重置密码</el-menu-item>
            </div>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!--    右边主内容区-->
      <el-main style="margin: 0;padding: 0">
          <el-container style="height: 100vh">
            <Header :avatar="avatar"/>
            <!--          中间区域-->
            <el-main style="margin: 0;padding: 0">
              <router-view/>
            </el-main>
            <!--          底部区域-->
            <el-footer class="my-el-footer">广软新生报到系统 ©2024 Created by 欧树波</el-footer>
          </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>