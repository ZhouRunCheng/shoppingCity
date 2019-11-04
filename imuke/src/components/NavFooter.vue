<template>
  <div class="footer">
<!--    <el-footer>Footer</el-footer>-->
    Hello
  </div>
</template>

<script>
    export default {
        name: "NavFooter"
    }
</script>

<style scoped>
  .footer{
    background-color: #f6f9fa;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
  .footer >>> .el-footer{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
