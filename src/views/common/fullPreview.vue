<script setup>
import {ref} from "vue";
import ViewAndDownload from "@/views/common/viewAndDownload.vue";
const loanForm = ref(null)
const drawer = ref(false)
//模板引用，父组件触发子组件事件
const open = (data)=>{
  drawer.value = true
  loanForm.value = data
}
defineExpose({
  open
})
//调用父组件方法
const emit = defineEmits(['callMyParent'])
const emitEvent = (fileDialogUrl)=>{
  emit('callMyParent',fileDialogUrl)
}
</script>

<template>
  <el-drawer
      v-model="drawer"
      direction="rtl"
      size="35%"
  >
    <template #header>
      <h1>贷款记录整体预览</h1>
    </template>
    <template #default>
      <div>
        <el-form  :model="loanForm">
          <el-form-item label="贷款类型:">
              <el-input
                  v-model="loanForm.loanType"
                  disabled
              >
              </el-input>
          </el-form-item>
          <el-form-item label="贷款金额:">
            <el-input :formatter="(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
                      v-model="loanForm.amount"
                      disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="申请陈述:">
            <el-input
                type="textarea"
                :maxlength="500"
                show-word-limit
                :autosize="{ minRows: 5}"
                v-model="loanForm.mark"
                disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="申请表1:">
<!--            <div v-if="loanForm.document1 !== null">-->
<!--              <DiffDocumentShow :file-url="loanForm.document1"/>-->
<!--              <el-button-group size="small">-->
<!--                <el-button @click="emitEvent(loanForm.document1)">-->
<!--                  <el-icon><View /></el-icon>-->
<!--                </el-button>-->
<!--                <el-button>-->
<!--                  <el-icon><Download /></el-icon>-->
<!--                </el-button>-->
<!--              </el-button-group>-->
<!--            </div>-->
            <ViewAndDownload :file-url="loanForm.document1" @callMyParent="emitEvent"/>
          </el-form-item>
          <el-form-item label="申请表2:">
<!--            <div v-if="loanForm.document2 !== null">-->
<!--              <DiffDocumentShow :file-url="loanForm.document2"/>-->
<!--              <el-button-group size="small">-->
<!--                <el-button @click="emitEvent(loanForm.document2)">-->
<!--                  <el-icon><View /></el-icon>-->
<!--                </el-button>-->
<!--                <el-button>-->
<!--                  <el-icon><Download /></el-icon>-->
<!--                </el-button>-->
<!--              </el-button-group>-->
<!--            </div>-->
            <ViewAndDownload :file-url="loanForm.document2" @callMyParent="emitEvent" />
          </el-form-item>
        </el-form>
      </div>
    </template>
  </el-drawer>

</template>

<style scoped>

</style>