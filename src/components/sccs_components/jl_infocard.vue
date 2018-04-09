<template>
  <el-card class="box-card" :class="class_this">
    <div slot="header" class="clearfix">
    <span>交路信息</span>
    
  </div>
        <ul>
        <li>车次：{{item?item.checi:""}}</li>
        <li>车型：{{item?item.chexing:''}}</li>
        <li>区间：{{item?item.qujian:''}}</li>
        <li>开点：{{item?item.leaveTime:''}}</li>
        <li>到点：{{item?item.arriveTime:''}}</li>
        <li>时长：<span style="color:red"> {{item?parseFloat(item.totalTime).toFixed(2):''}}</span>小时</li>
        <li>扣除：{{item?item.kouchu:''}}分钟</li>
        <li>备注：{{item.beizhu.join(',')}}</li>
        </ul>
        </el-card>
</template>
<script>
export default {
  props:['jl'],
  data(){
      return{
          class_this:'',
          item:{
              checi:'请从左侧选择',
              chexing:'',
              qujian:'',
              leaveTime:'',
              arriveTime:'',
              totalTime:0,
              kouchu:'',
              beizhu:[]
          },
      }
  },
  mounted(){
     
  },
  watch:{
      jl(newval,oldval){
          if(!!newval){
              this.item=newval;
              this.class_this='active'
          }else{
              this.class_this=''
            this.item={
              checi:'请从左侧选择',
              chexing:'',
              qujian:'',
              leaveTime:'',
              arriveTime:'',
              totalTime:0,
              kouchu:'',
              beizhu:[]
          }
          }
          
      }
  },
  filters:{
      join(item){
          if(!!item.beizhu){
              return item.beizhu.join(',')
          }else{
              return ''
          }
      }
  }
}
</script>
<style scoped>
.el-card{
    height: 400px;
    margin-bottom: 10px
}
li{
    text-align: left;height: auto;line-height: 30px;
    border-bottom: darkgray 1px solid;
}
ul{
    padding: 10px;
}
.active{
    background: rgba(57, 159, 255,0.3)
}
</style>
