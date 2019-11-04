<template>
    <div class="logo">
      <div class="jumbotron">
        <h1>Buy Nothing</h1>
        <p>你在这买不了东西，但你能体验到清空购物车的快感！</p>
        <p><a href="https://www.taobao.com/"><el-button type="info" size="big">TaoBao</el-button></a></p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "NavLogo"
    }
</script>

<style scoped>
  .logo{
    background-color: #FFC125;
  }
  .logo >>> .jumbotron {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .logo >>> .jumbotron h1,
  .logo >>> .jumbotron p{
    padding: .2rem;
  }
</style>

