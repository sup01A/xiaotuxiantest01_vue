<script setup>
import {Download, View} from "@element-plus/icons-vue";
import DiffDocumentShow from "@/views/common/diffDocumentShow.vue";

const props = defineProps({
  fileUrl:{
    type: String
  }
});
//调用父组件方法
const emit = defineEmits(['callMyParent'])
const emitEvent = ()=>{
  emit('callMyParent',props.fileUrl)
}
</script>

<template>
  <div v-if="props.fileUrl !== null">
    <DiffDocumentShow :file-url="props.fileUrl"/>
    <el-button-group size="small">
      <el-button @click="emitEvent">
        <el-icon><View /></el-icon>
      </el-button>
      <el-button>
        <el-link :href="props.fileUrl" :underline="false">
          <el-icon><Download /></el-icon>
        </el-link>
      </el-button>
    </el-button-group>
  </div>
</template>

<style scoped>

</style>