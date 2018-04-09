<template>
 <div class="content"  @mousedown="contentDropStart($event)" :contentStyle="contentStyle" draggable="true">
     <span>共计<span style="color:red">{{JLs.length}}</span>趟交路</span>
     
     <ul>
         <li draggable="true" :class="currentIndex==index?'active':'notactive'"  v-for="(item,index) in JLs" v-bind:key="index" @mouseup="cancelDrop(item)" @mousedown="dropJL(item,index,$event)"><span class='name'>{{item.checi.replace(/\（\）/g,'')}}</span>
         <el-popover
        ref="popover1"
        placement="bottom-start"
        title="交路详情"
        width="200"
        trigger="click"
       >
       <el-card class="box-card">
        <!-- <li v-for="(ite,ind) in item" :key="ind" class="text item">
            {{ ite}}
        </li> -->
        <li>车次：{{item.checi.replace(/\（\）/g,'')}}</li>
        <li>车型：{{item.emuType}}</li>
        <li>区间：{{item.qujian}}</li>
        <li>开点：{{item.leaveTime}}</li>
        <li>到点：{{item.arriveTime}}</li>
        <li>时长：<span style="color:red"> {{item.totalTime}}</span>小时</li>
        <li>扣除：{{item.kouchu}}</li>
        <li>天数：{{item.type=='oneday'?'1天':'2天'}}</li>
        </el-card>
        <el-button class="default"  slot="reference" size="mini">详情</el-button>
     </el-popover>
         </li>
     </ul>
    
 </div>
 
</template>
<script>
import bus from './bus'

export default {
    props:['JLs','contentStyle'],
  data(){
      return{
          department:'南京南',
          currentIndex:0,
          isContentMove:false,
      }
  },
  mounted(){

  },
  methods:{
      
      contentDropStart(ev){
         bus.$emit('isContentMove',true)
      },
    
      cancelDrop(item){
           bus.$emit('cancelDrop')
      },
      dropJL(item,index,ev){

          bus.$emit('select_JL',{item:item,index:index})
          this.currentIndex=index;
          ev.stopPropagation();//取消冒泡不然会触发父元素的事件
      },
    
  }
}
</script>
<style scoped>
.content{
    width:250px;
    position: fixed;
    top:100px;
    right:-15px;
    z-index: 999;
    max-height: 500px;overflow-y: scroll;
    color:#1b1b1b;
    padding: 10px;
    background: aliceblue;
    border: 1px dotted #cccccc;
    border-radius: 10px;
    box-shadow: rgba(0, 80, 141, 0.72) 3px 3px 3px 1px;
}
.content ul{
    list-style: none;
}
.content li{
    margin-top:10px;
    box-shadow: rgba(0, 80, 141, 0.72) 3px 3px 3px 1px;
    cursor: move;
    border-radius: 5px;
}
.content li:hover{
    margin-top:10px;
    background: rgba(0, 80, 141, 0.72);
    color: aliceblue;
    box-shadow: rgba(250, 250, 250, 0.52) 3px 3px 3px 1px;
    cursor: move;
    border-radius: 5px;
}
.active{
    background: rgba(0, 80, 141, 1);
    color: aliceblue;
}
.notactive{
    background:  rgba(255, 255, 255, 0.9);
}
.name{
    width:150px;
    overflow: hidden;
    vertical-align: middle;
    display: inline-block;
}
</style>

