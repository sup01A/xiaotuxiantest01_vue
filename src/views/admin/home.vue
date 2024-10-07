<script setup>
import {deptTestServiceApi} from "@/service/admin/adminService.js";
import {ref} from "vue";
const data = ref('')
const getData = async ()=>{
  let axiosResponse = await deptTestServiceApi();
  data.value = axiosResponse.data
}
getData()
</script>

<template>
<h1 v-if="data">{{ data }}</h1>
  <h1 v-else>没有数据</h1>
</template>

<style scoped>

</style>