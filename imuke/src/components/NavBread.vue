<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{position}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
    export default {
        name: "NavBread",
        props: ['position'],
    }
</script>

<style scoped>
  .bread {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 15px;
  }
</style>
