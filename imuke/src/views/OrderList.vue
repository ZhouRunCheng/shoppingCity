<template>
    <div class="order-list">
      <div class="order-title">
        <h1>订单列表</h1>
      </div>
      <div class="order-body">
        <el-table
          :data="orderList"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单ID">
                  <span>{{ props.row.orderId }}</span>
                </el-form-item>
                <el-form-item label="商品列表">
                  <span>{{ props.row.goodsName }}</span>
                </el-form-item>
                <el-form-item label="商品数量">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="订单总额">
                  <span>{{ props.row.allPrice }}</span>
                </el-form-item>
                <el-form-item label="订单状态">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="订单 ID"
            prop="orderId">
          </el-table-column>
          <el-table-column
            label="商品数量"
            prop="goodsCount">
          </el-table-column>
          <el-table-column
            label="订单总额"
            prop="allPrice">
          </el-table-column>
          <el-table-column
            label="订单状态"
            prop="status">
          </el-table-column>
          <el-table-column
            label="完成时间"
            prop="createDate">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "OrderList",
        data() {
          return {
            orderList: []
          }
        },
        mounted() {
            this.getOrderList();
        },
        methods: {
          getOrderList() {
            this.$axios.get('/goods/orderList').then(res => {

              if(res.data.status === '0') {
                this.orderList = res.data.result
                this.orderList.forEach(item1 => {
                  item1.goodsCount = item1.goodsList.length
                  item1.allPrice = 0;
                  item1.goodsName = [];
                  item1.goodsList.forEach(item2 => {
                    item1.allPrice += ( item2.productNum * item2.salePrice )
                    item1.goodsName.push(item2.productName)
                  })
                  item1.status = item1.orderStatus ? "已完成" : "未完成"

                })
                console.log(this.orderList);
              }else{
                console.log(res.data.msg);
              }
            })
          }
        }
    }
</script>

<style scoped>
  .order-body >>> .demo-table-expand {
    font-size: 0;
  }
  .order-body >>> .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .order-body >>> .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .order-body >>> .el-table__expand-icon {
    display: flex;
  }
</style>
