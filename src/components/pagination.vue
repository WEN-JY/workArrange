<template>
<div>
 
  <div class="block">

    <el-pagination
     background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20, 50, 100,500]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
  </div>
</div>
</template>
<style scoped>
.block{
    margin-top:20px
}
</style>
<script>
import  bus from './bus'//这里的import是重点
  export default {
    props:["total"],
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        bus.$emit('tablePageSize', val)
      },
      handleCurrentChange(val) {
         bus.$emit('changePage', val)
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        
        currentPage4: 1
      };
    }
  }
</script>