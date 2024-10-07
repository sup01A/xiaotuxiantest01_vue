<script setup>
defineProps({
  avatar: {
    type: String,
    required: true
  }
})
</script>
<!-- Header.vue -->
<template>
  <el-header style="display: flex; justify-content: space-between;height: 55px;background-image: linear-gradient(to right, #59eae9 , #4c9fd8);">
    <p>欢迎你：User</p>
    <el-dropdown>
      <span>
        <el-avatar :src="avatar" style="margin-top: 5px"/>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="info">基本资料</el-dropdown-item>
          <el-dropdown-item command="avatar">更换头像</el-dropdown-item>
          <el-dropdown-item command="resetpassword">重置密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style scoped>
/* 你可以在这里添加特定于 Header 组件的样式 */
</style>